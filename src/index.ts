import http from 'http';
import path from 'path';
// import cors from 'cors';
import express from 'express';
import redis from 'redis';
import session from 'express-session';
import connectRedis from 'connect-redis';
import mikroOrmConfig from './config/mikro-orm';
import { MikroORM } from '@mikro-orm/core';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { __prod__ } from './constants';
import { UserResolver } from './resolvers/UserResolver';
import { Book } from './resolvers/Book';
import { AppContext } from 'types';

const start = async () => {
  const PORT = 4000;
  const orm = await MikroORM.init(mikroOrmConfig);

  await orm.getMigrator().up();

  const generator = orm.getSchemaGenerator();
  await generator.updateSchema();

  const app = express();
  // app.use(cors());
  // app.set('Access-Control-Allow-Origin', 'https://studio.apollographql.com');
  // app.set('Access-Control-Allow-Credentials', 'true');

  const RedisStore = connectRedis(session);
  const redisHost = '127.0.0.1';
  const redisPort = 6379;
  const redisClient = redis.createClient({
    host: redisHost,
    port: redisPort,
  });

  app.use(
    session({
      name: 'b-eezy-id',
      store: new RedisStore({
        client: redisClient,
        disableTTL: true,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 2,
        httpOnly: true,
        secure: __prod__, // https only
        sameSite: 'none', // lax for prod
      },
      saveUninitialized: false,
      secret: '98kdbeezykshh',
      resave: false,
    }),
  );

  const httpServer = http.createServer(app);

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, Book],
      validate: false,
      emitSchemaFile: path.resolve(__dirname, 'graphql/schema.gql'),
    }),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: ({ req, res }): AppContext => ({
      em: orm.em,
      req,
      res,
    }),
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({
    app,
    cors: {
      credentials: true,
      origin: true,
    },
  });

  await new Promise((resolve: any) => httpServer.listen({ port: PORT, resolve }));
  console.log(`💾 Server running on port: ${PORT}, path: ${apolloServer.graphqlPath}`);
};

start().catch((err) => {
  console.log(`🚨 : ${err.message}`);
});
