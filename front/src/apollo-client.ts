import {
  ApolloClient,
  ApolloLink,
  concat,
  createHttpLink,
  split,
  InMemoryCache,
} from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

const cache = new InMemoryCache();

export default function getApolloClient() {
  // use the gql bff url
  const httpLink = createHttpLink({
    uri: `${process.env.REACT_APP_BFF_URL}/graphql`,
  });

  const wsLink = new WebSocketLink({
    uri: `${process.env.REACT_APP_WS_BFF_URL}/graphql`,
    options: {
      reconnect: true,
    },
  });

  const link = split(
    // split based on operation type
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink
  );

  // add the authorization to the headers
  const authMiddleware = new ApolloLink((operation, forward) => {
    // @ts-ignore
    operation.setContext(({ headers = {} }) => {
      return {
        headers: {
          ...headers,
          Authorization: null, // ex: store.getState().user.token
          'X-Api-Key': null, // ex: process.env.API_KEY
        },
      };
    });
    return forward ? forward(operation) : null;
  });

  return new ApolloClient({
    link: concat(authMiddleware, link),
    cache: cache,
  });
}
