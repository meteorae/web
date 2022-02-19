import {
  GetChildren,
  GetChildrenVariables,
} from '@/graphql/__generated__/GetChildren';
import {
  Button,
  Flex,
  Heading,
  IconButton,
  Stack,
  Text,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react';
import { mdiPencil, mdiPlay } from '@mdi/js';
import { Icon } from '@mdi/react';
import { DateTime } from 'luxon';
import { loader } from 'graphql.macro';
import { GetItem } from '@/graphql/__generated__/GetItem';
import { useQuery } from '@apollo/client';
import ItemGrid from './ItemGrid';
import { useParams } from 'react-router-dom';

const GET_CHILDREN = loader('../graphql/GetChildren.gql');

interface ItemDetailGenericProps {
  item: NonNullable<GetItem['item']>;
}

function ItemDetailGeneric({ item }: ItemDetailGenericProps) {
  const params = useParams();

  const { data, fetchMore } = useQuery<GetChildren, GetChildrenVariables>(
    GET_CHILDREN,
    {
      variables: { item: params.id || '', limit: 20, offset: 0 },
    },
  );

  return (
    <Flex h='100%' w='100%' flexDirection='column' alignItems='baseline'>
      <Flex direction='column' w={'100%'} h={'100%'}>
        <Flex
          direction='column'
          px={8}
          borderBottomColor={useColorModeValue('gray.200', 'gray.800')}
          borderBottomWidth={'1px'}>
          <Heading as='h1' size='xl' mb={0}>
            {item?.title}
          </Heading>
          <Text opacity='0.8' userSelect='none' mt={0} mb={4}>
            {item && 'releaseDate' in item && item.releaseDate
              ? DateTime.fromISO(item.releaseDate).toFormat('yyyy')
              : ''}
          </Text>
          <Stack direction='row' spacing={2} mb={3} alignItems='center'>
            <Button
              size='sm'
              leftIcon={<Icon path={mdiPlay} size={1} />}
              colorScheme='red'
              variant='solid'>
              Play
            </Button>
            <Tooltip label='Edit' placement='bottom'>
              <IconButton
                backgroundColor='gray.600'
                color='white'
                aria-label='Edit'
                size='sm'
                _hover={{ backgroundColor: 'gray.700' }}
                icon={<Icon path={mdiPencil} size={1} />}
              />
            </Tooltip>
          </Stack>
        </Flex>
        <ItemGrid
          fetchMore={() => {
            console.debug('fetchMore');
            return fetchMore({
              query: GET_CHILDREN,
              variables: {
                item: item.id,
                offset: data?.children?.items?.length ?? 0,
                limit: 20,
              },
            });
          }}
          data={data?.children?.items ?? []}
          total={data?.children?.total ?? 0}
        />
      </Flex>
    </Flex>
  );
}

export default ItemDetailGeneric;
