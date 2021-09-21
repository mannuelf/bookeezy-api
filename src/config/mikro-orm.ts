import path from 'path';
import { MikroORM } from '@mikro-orm/core';
import { __prod__ } from '../constants';
import { Hi } from '../entities/Hi';

export default {
  type: 'postgresql',
  clientUrl: 'postgres://root:root@192.168.64.6:30432/bookeezydb',
  entities: [Hi],
  dbName: 'bookeezydb',
  user: 'root',
  password: 'root',
  migrations: {
    path: path.join(__dirname, './migrations'),
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
} as Parameters<typeof MikroORM.init>[0]; // cast to Parameters to get the types to enable auto completion
