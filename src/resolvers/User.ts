import 'reflect-metadata';
import { Resolver, Query } from 'type-graphql';

@Resolver()
export class User {
  @Query(() => String)
  user() {
    return 'user says hi';
  }
}
