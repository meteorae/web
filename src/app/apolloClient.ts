import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  FieldFunctionOptions,
  InMemoryCache,
} from '@apollo/client';
import { buildClientSchema, IntrospectionQuery } from 'graphql';
import { setContext } from '@apollo/client/link/context';
import { withScalars } from 'apollo-link-scalars';
import { DateTimeResolver } from 'graphql-scalars';
import introspectionResult from '../schema.json';
import { GetItems, GetItemsVariables } from '../pages/__generated__/GetItems';

const schema = buildClientSchema(
  introspectionResult as unknown as IntrospectionQuery,
);

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

const scalarLink = ApolloLink.from([withScalars({ schema, typesMap })]);

const apolloClient = new ApolloClient({
  link: authLink.concat(scalarLink).concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          items: {
            keyArgs: false,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            merge(existing = {}, incoming, { args: { offset = 0 } }) {
              const total = incoming?.total || 0;

              const mergedItems = existing.items ? existing.items.slice(0) : [];
              for (let i = 0; i < (incoming?.items?.length || 0); ++i) {
                mergedItems[offset + i] = incoming?.items[i];
              }
              return {
                items: mergedItems,
                total,
              };
            },
          },
        },
      },
    },
  }),
});

export default apolloClient;
