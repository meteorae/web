import { useQuery } from '@apollo/client';
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
import debounce from 'lodash-es/debounce';
import { Navigate, useParams } from 'react-router-dom';

import {
  GetItemsDocument,
  GetItemsQuery,
  GetItemsQueryVariables,
  ItemsResult,
} from '@meteorae/graphql-types';
import { CardSizeSlider } from '@meteorae/ui-react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import ItemGrid from '../../components/item-grid';
import { setCardSize } from '../../features/settings/settingsSlice';

type LibraryParams = {
  id: string;
};

function Library() {
  const params = useParams<LibraryParams>();

  const dispatch = useAppDispatch();
  const cardWidth = useAppSelector((state) => state.settings.cardSize);

  if (!params.id) {
    <Navigate to='/' />;
  }

  const { loading, error, data, fetchMore } = useQuery<
    GetItemsQuery,
    GetItemsQueryVariables
  >(GetItemsDocument, {
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
            <CardSizeSlider
              defaultValue={cardWidth}
              onChange={debounce((value) => {
                dispatch(setCardSize({ cardSize: Math.round(value) }));
              }, 250)}
            />
          </Box>
        </Flex>
      </Flex>
      <Flex h='100%' w='100%' flexDirection='column'>
        <ItemGrid
          key={params.id}
          fetchMore={() => {
            return fetchMore({
              query: GetItemsDocument,
              variables: {
                libraryId: params.id,
                offset: data?.items?.items?.length ?? 0,
                limit: 50,
              },
            });
          }}
          data={(data?.items as ItemsResult) ?? {}}
          square={data?.library?.type === 'music'}
        />
      </Flex>
    </Stack>
  );
}

export default Library;
