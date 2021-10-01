import http from 'http';
import express from 'express';
import { MikroORM } from '@mikro-orm/core';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';

import { __prod__ } from './constants';
import mikroOrmConfig from './config/mikro-orm';
import { Hi } from './resolvers/Hi';
import { User } from './resolvers/User';
import { Book } from './resolvers/Book';

const start = async () => {
  const PORT = 4000;
  const orm = await MikroORM.init(mikroOrmConfig);

  const hi = orm.em.create(Hi, { content: 'hello world' });
  await orm.em.persistAndFlush(hi);

  const app = express();
  const httpServer = http.createServer(app);

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [Hi, User, Book],
      validate: false,
    }),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: () => ({ em: orm.em }),
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
  await new Promise((resolve: any) => httpServer.listen({ port: PORT, resolve }));
  console.log(`🚀 Server running on port: ${PORT}, path: ${apolloServer.graphqlPath}`);
};

start().catch((err) => {
  console.log(`🚨 oops: ${err.message}`);
});
