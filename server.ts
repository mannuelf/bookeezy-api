import {
  Application,
  Router,
  RouterContext,
} from 'https://deno.land/x/oak@v6.2.0/mod.ts';
import { applyGraphQL, gql } from 'https://deno.land/x/oak_graphql/mod.ts';

let count = 0;
const app = new Application();

const types = gql`
  type User {
    id: Int
    first_name: String
    last_name: String
    email: String
  }

  type UserOutput {
    id: Int
  }

  type Query {
    fetchUser(id: Int): User
  }

  type Mutation {
    insertUser(first_name: String!, last_name: String!): UserOutput!
  }
`;

const resolvers = {
  Query: {
    fetchUser: (parent: any, { id }: any, context: any, info: any) => {
      // make database calls or http requests inside and return data
      return {
        id: 1,
        first_name: 'Mannuel',
        last_name: 'Ferreira',
      };
    },
  },
  Mutation: {
    insertUser: (
      parent: any,
      { first_name, last_name }: any,
      context: any,
      info: any
    ) => {
      return {
        id: 1,
      };
    },
  },
};

const GraphQLService = await applyGraphQL<Router>({
  Router,
  typeDefs: types,
  resolvers: resolvers,
  context: (ctx: RouterContext) => {
    return { user: 'Mannuel' };
  },
});

app.use(GraphQLService.routes(), GraphQLService.allowedMethods());

await app.listen({ port: 8090 });
