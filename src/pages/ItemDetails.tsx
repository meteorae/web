import CardSizeSlider from '@/components/CardSizeSlider';
import ItemDetailGeneric from '@/components/ItemDetailGeneric';
import ItemDetailImageAlbum from '@/components/ItemDetailImageAlbum';
import { GetItem, GetItemVariables } from '@/graphql/__generated__/GetItem';
import { useQuery } from '@apollo/client';
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Stack,
} from '@chakra-ui/react';
import { loader } from 'graphql.macro';
import { Navigate, useParams } from 'react-router';

const GET_ITEM = loader('../graphql/GetItem.gql');

function getDetailsComponentForItem(item: GetItem['item']) {
  switch (item?.__typename) {
    case 'ImageAlbum':
      return <ItemDetailImageAlbum item={item} />;
    default:
      return <ItemDetailGeneric item={item} />;
  }
}

function ItemDetails() {
  const params = useParams();

  const { data } = useQuery<GetItem, GetItemVariables>(GET_ITEM, {
    variables: { id: params.id || '' },
  });

  if (!params.id) {
    <Navigate to='/' />;
  }

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
              <BreadcrumbLink href='#'>Home</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Flex>
        <Flex justifyContent='flex-end'>
          <Box flexShrink='0'>
            <CardSizeSlider />
          </Box>
        </Flex>
      </Flex>
      {data?.item ? getDetailsComponentForItem(data?.item) : null}
    </Stack>
  );
}

export default ItemDetails;
