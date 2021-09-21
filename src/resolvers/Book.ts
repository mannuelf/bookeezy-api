import 'reflect-metadata';
import { Resolver, Query } from 'type-graphql';

@Resolver()
export class Book {
  @Query(() => String)
  book() {
    return 'A book';
  }
}
