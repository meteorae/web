import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  createHttpLink,
  split,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { withScalars } from 'apollo-link-scalars';
import { DateTimeResolver } from 'graphql-scalars';
import { createClient } from 'graphql-ws';

import typeDefs from '../../../../schema.gql';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mergeItemResults(existing: any, incoming: any, offset: number) {
  const total = incoming?.total || 0;

  const mergedItems = existing.items ? existing.items.slice(0) : [];
  for (let i = 0; i < (incoming?.items?.length || 0); ++i) {
    mergedItems[offset + i] = incoming?.items[i];
  }
  return {
    items: mergedItems,
    total,
  };
}

const httpLink = createHttpLink({
  uri: 'http://localhost:42000/graphql',
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: 'ws://localhost:42000/graphql',
  }),
);

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const typesMap = {
  DateTime: DateTimeResolver,
};

const schema = makeExecutableSchema({
  typeDefs,
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);

    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const scalarLink = ApolloLink.from([withScalars({ schema, typesMap })]);

const apolloClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default apolloClient;
