import { useQuery } from '@apollo/client';
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Center,
  Flex,
  Spinner,
} from '@chakra-ui/react';
import { Navigate, useParams } from 'react-router-dom';
import { loader } from 'graphql.macro';

import CardSizeSlider from '@/components/CardSizeSlider';
import ItemGrid from '@/components/ItemGrid';
import { GetItems, GetItemsVariables } from '@/graphql/__generated__/GetItems';

const GET_ITEMS = loader('../graphql/GetItems.gql');

function Library() {
  const params = useParams();

  const { loading, error, data, fetchMore } = useQuery<
    GetItems,
    GetItemsVariables
  >(GET_ITEMS, {
    variables: { libraryId: params.id || '0', offset: 0, limit: 50 },
  });

  if (!params.id) {
    <Navigate to='/' />;
  }

  if (loading)
    return (
      <Center>
        <Spinner size='xl' />
      </Center>
    );
  // TODO: Properly handle errors
  if (error) return <p>Error! {error.message}</p>;

  return (
    <Flex h='100%' w='100%' direction='column'>
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
    </Flex>
  );
}

export default Library;
