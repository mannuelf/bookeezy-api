import http from 'http';
import express from 'express';
import { MikroORM } from '@mikro-orm/core';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { __prod__ } from './constants';
import mikroOrmConfig from './config/mikro-orm';
import { UserResolver } from './resolvers/UserResolver';
import { Book } from './resolvers/Book';
import path from 'path';

const start = async () => {
  const PORT = 4000;
  const orm = await MikroORM.init(mikroOrmConfig);

  await orm.getMigrator().up();

  const generator = orm.getSchemaGenerator();
  await generator.updateSchema();

  const app = express();
  const httpServer = http.createServer(app);

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, Book],
      validate: false,
      emitSchemaFile: path.resolve(__dirname, 'graphql/schema.gql'),
    }),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: () => ({ em: orm.em }),
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  await new Promise((resolve: any) => httpServer.listen({ port: PORT, resolve }));
  console.log(`💾 Server running on port: ${PORT}, path: ${apolloServer.graphqlPath}`);
};

start().catch((err) => {
  console.log(`🚨 : ${err.message}`);
});
