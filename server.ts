import { serve } from 'https://deno.land/std@0.90.0/http/server.ts';
import { GraphQLHTTP } from 'https://deno.land/x/gql/mod.ts';
import { makeExecutableSchema } from 'https://deno.land/x/graphql_tools/mod.ts';
import { gql } from 'https://deno.land/x/graphql_tag/mod.ts';

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => `Hello world`,
  },
};

const schema = makeExecutableSchema({ resolvers, typeDefs });

const server = serve({ port: 5000 });

for await (const req of server) {
  req.url.startsWith('/graphql')
    ? await GraphQLHTTP({
        schema,
        graphiql: true,
      })(req)
    : req.respond({ status: 404 });
}
export default {};
