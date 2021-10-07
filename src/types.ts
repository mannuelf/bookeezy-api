import { Connection, EntityManager, IDatabaseDriver } from '@mikro-orm/core';
import { Request, Response } from 'express';
import session from 'express-session';

/**
 * @property {userId} used for identifying user for session
 */
declare module 'express-session' {
  interface SessionData {
    userId: number;
  }
}

export type AppContext = {
  em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>;
  req: Request & { session: session.Session & Partial<session.SessionData> };
  res: Response;
};
