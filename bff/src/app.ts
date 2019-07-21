import http from "http";
import express, { Request } from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import "reflect-metadata";

import ChannelResolver from "./graphql/resolvers/channel";
import IDatabaseClient, { pgDatabaseClient } from "./data-sources";

export interface AppContext {
  request: Request;
  databaseClient: IDatabaseClient;
}

// const authChecker: AuthChecker = (
//   { root, args, context, info },
//   roles
// ) => {
//   // here we can read the user from context
//   // and check his permission in the db against the `roles` argument
//   // that comes from the `@Authorized` decorator, eg. ["ADMIN", "MODERATOR"]

//   return true; // or false if access is denied
// };

const app = express();

async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [ChannelResolver]
    // authChecker: authChecker
  });
  const server = new ApolloServer({
    schema,
    context: async ({ req }): Promise<AppContext> => {
      // pass request, databaseClient and user into the context for each resolver
      return {
        request: req,
        databaseClient: pgDatabaseClient
      };
    }
    // dataSources for the REST APIs
  });

  //app.use(cors());

  server.applyMiddleware({ app });

  const httpServer = http.createServer(app);
  server.installSubscriptionHandlers(httpServer);

  httpServer.listen(4000, () => {
    console.log(`🚀  Server ready at http://localhost:4000${server.graphqlPath}`);
  });
}

bootstrap();
