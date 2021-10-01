import path from 'path';
import { MikroORM } from '@mikro-orm/core';
import { Hi } from '../entities/Hi';
import { User } from '../entities/User';
import { Book } from '../entities/Book';

export default {
  type: 'postgresql',
  clientUrl: 'postgres://root:root@localhost:5432/postgres',
  entities: [Hi, User, Book],
  dbName: 'bookeezydb',
  user: 'postgres',
  password: 'root',
  migrations: {
    path: path.join(__dirname, './migrations'),
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
} as Parameters<typeof MikroORM.init>[0]; // cast to Parameters to get the types to enable auto completion
