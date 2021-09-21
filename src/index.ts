import express from 'express';
import http from 'http';
import { MikroORM } from '@mikro-orm/core';
import { __prod__ } from './constants';
import mikroOrmConfig from '@config/mikro-orm';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { buildSchema } from 'type-graphql';
import { HiResolver } from './resolvers/hi';

const start = async () => {
  const PORT = 4000;
  const app = express();
  const httpServer = http.createServer(app);
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HiResolver],
      validate: false,
    }),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: () => ({}),
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
  await new Promise((resolve: any) => httpServer.listen({ port: PORT, resolve }));

  console.log(`🚀 Server started: ${PORT}, ${apolloServer.graphqlPath}`);
};

start().catch((err) => {
  console.log(`🚨 oops: ${err.message}`);
});
