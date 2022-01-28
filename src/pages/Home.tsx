import { gql, useQuery } from '@apollo/client';
import { Center, Spinner } from '@chakra-ui/react';
import ItemGrid from '../components/ItemGrid';
import { GetItems, GetItemsVariables } from './__generated__/GetItems';

const GET_ITEMS = gql`
  query GetItems($libraryId: ID!, $offset: Int, $limit: Int) {
    items(libraryId: $libraryId, offset: $offset, limit: $limit) {
      items {
        __typename
        ... on Movie {
          id
          title
          releaseDate
          thumb
          art
        }
      }
      total
    }
  }
`;

function Home() {
  const { loading, error, data, fetchMore } = useQuery<
    GetItems,
    GetItemsVariables
  >(GET_ITEMS, {
    variables: { libraryId: '1', offset: 0, limit: 10 },
  });

  if (loading)
    return (
      <Center>
        <Spinner size='xl' />
      </Center>
    );
  // TODO: Properly handle errors
  if (error) return <p>Error! {error.message}</p>;

  return (
    <ItemGrid
      fetchMore={() => {
        return fetchMore({
          query: GET_ITEMS,
          variables: {
            libraryId: '1',
            offset: data?.items?.items?.length ?? 0,
            limit: 10,
          },
        });
      }}
      data={data?.items?.items ?? []}
    />
  );
}

export default Home;
