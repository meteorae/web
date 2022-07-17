import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { withScalars } from 'apollo-link-scalars';
import { DateTimeResolver } from 'graphql-scalars';

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
  uri: '/query',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
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

const scalarLink = ApolloLink.from([withScalars({ schema, typesMap })]);

const apolloClient = new ApolloClient({
  link: authLink.concat(scalarLink).concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          items: {
            keyArgs: ['libraryId'],
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            merge(existing = {}, incoming, { args: { offset = 0 } }) {
              return mergeItemResults(existing, incoming, offset);
            },
          },
          children: {
            keyArgs: ['item'],
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            merge(existing = {}, incoming, { args: { offset = 0 } }) {
              return mergeItemResults(existing, incoming, offset);
            },
          },
        },
      },
    },
  }),
});

export default apolloClient;
