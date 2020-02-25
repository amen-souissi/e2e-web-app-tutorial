import { ApolloClient } from "apollo-client";
import { toIdValue, getMainDefinition } from "apollo-utilities";
import { ApolloLink, concat, split } from "apollo-link";
import { createHttpLink } from "apollo-link-http";
import { WebSocketLink } from "apollo-link-ws";
import { InMemoryCache, IdGetterObj, IntrospectionFragmentMatcher } from "apollo-cache-inmemory";
// import { AsyncStorage } from "react-native";
// import { persistCache } from "apollo-cache-persist";

import getEnvVars from "../environment";

const { apiUrl, wsApiUrl } = getEnvVars();

console.log(apiUrl, wsApiUrl);

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: {
    __schema: {
      types: []
    }
  }
});

const dataIdFromObject = (getterObj: IdGetterObj): string => {
  return `${getterObj.id || ""}-${getterObj.__typename}`;
};

const cache = new InMemoryCache({
  dataIdFromObject,
  fragmentMatcher,
  cacheRedirects: {
    Query: {
      node: (_, args) => {
        return toIdValue(dataIdFromObject({ id: args.id }));
      }
    }
  }
});

// await persistCache({
//   cache,
//   storage: AsyncStorage
// });

export default function getApolloClient() {
  // await before instantiating ApolloClient, else queries might run before the cache is persisted

  // use the gql bff url
  const httpLink = createHttpLink({
    uri: `${apiUrl}/graphql`
  });

  const wsLink = new WebSocketLink({
    uri: `${wsApiUrl}/graphql`,
    options: {
      reconnect: true
    }
  });

  const link = split(
    // split based on operation type
    ({ query }) => {
      const definition = getMainDefinition(query);
      return definition.kind === "OperationDefinition" && definition.operation === "subscription";
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
          "X-Api-Key": null // ex: process.env.API_KEY
        }
      };
    });
    return forward ? forward(operation) : null;
  });

  return new ApolloClient({
    link: concat(authMiddleware, link),
    cache: cache
  });
}
