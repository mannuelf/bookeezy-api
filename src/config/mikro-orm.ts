import path from 'path';
import { MikroORM } from '@mikro-orm/core';
import { __prod__ } from '../constants';
import { User } from '../entities/User';
import { Book } from '../entities/Book';

export default {
  type: 'postgresql',
  clientUrl: 'postgres://root:root@192.168.64.11:30432/postgres',
  entities: [User, Book],
  dbName: 'bookeezydb',
  user: 'postgres',
  password: 'root',
  migrations: {
    path: path.join(__dirname, '../migrations'),
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
  debug: !__prod__,
} as Parameters<typeof MikroORM.init>[0]; // cast to Parameters to get the types to enable auto completion
