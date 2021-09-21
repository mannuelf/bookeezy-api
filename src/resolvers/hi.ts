import 'reflect-metadata';
import { Resolver, Query } from 'type-graphql';

@Resolver()
export class HiResolver {
  @Query(() => String)
  hi() {
    return 'hi there champ';
  }
}
