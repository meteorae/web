import { gql, useQuery } from '@apollo/client';
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Center,
  Flex,
  Spinner,
  Stack,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import CardSizeSlider from '../components/CardSizeSlider';
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

    library(id: $libraryId) {
      id
      name
    }
  }
`;

function Library() {
  const params = useParams();

  const { loading, error, data, fetchMore } = useQuery<
    GetItems,
    GetItemsVariables
  >(GET_ITEMS, {
    variables: { libraryId: params.id || '0', offset: 0, limit: 50 },
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
    <Stack h='100%' w='100%' direction='column'>
      <Flex
        flexShrink='0'
        justifyContent='space-between'
        align='center'
        h='3rem'
        px={8}>
        <Flex whiteSpace='nowrap' flexGrow='1' flexShrink='1' flexBasis='25%'>
          <Breadcrumb>
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink href='#'>{data?.library?.name}</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Flex>
        <Flex justifyContent='flex-end'>
          <Box flexShrink='0'>
            <CardSizeSlider />
          </Box>
        </Flex>
      </Flex>
      <ItemGrid
        fetchMore={() => {
          return fetchMore({
            query: GET_ITEMS,
            variables: {
              libraryId: params.id,
              offset: data?.items?.items?.length ?? 0,
              limit: 50,
            },
          });
        }}
        data={data?.items?.items ?? []}
        total={data?.items?.total ?? 0}
      />
    </Stack>
  );
}

export default Library;
