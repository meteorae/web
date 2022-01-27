import { gql, useQuery } from '@apollo/client';
import { Center, Spinner } from '@chakra-ui/react';
import ItemGrid from '../components/ItemGrid';
import { GetItems, GetItemsVariables } from './__generated__/GetItems';

const GET_ITEMS = gql`
  query GetItems($offset: Int, $limit: Int) {
    allItems(libraryId: 0, offset: $offset, limit: $limit) {
      items {
        id
        title
        releaseDate
        thumb
        art
      }
      totalCount
    }
  }
`;

function Home() {
  const { loading, error, data, fetchMore } = useQuery<
    GetItems,
    GetItemsVariables
  >(GET_ITEMS, {
    variables: { offset: 0, limit: 10 },
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
            offset: data?.allItems?.items?.length ?? 0,
          },
        });
      }}
      data={data?.allItems?.items}
    />
  );
}

export default Home;
