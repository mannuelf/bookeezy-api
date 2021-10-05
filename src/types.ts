import { Connection, EntityManager, IDatabaseDriver } from '@mikro-orm/core';

export type AppContext = {
  em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>;
};
