import { gql, useQuery } from '@apollo/client';
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Flex,
  Heading,
  IconButton,
  Stack,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import {
  mdiCheckCircleOutline,
  mdiCircleSmall,
  mdiPencil,
  mdiPlay,
  mdiStar,
} from '@mdi/js';
import Icon from '@mdi/react';
import { DateTime } from 'luxon';
import Rating from 'react-rating';
import { Navigate, useParams } from 'react-router';
import CardSizeSlider from '../components/CardSizeSlider';
import ItemPlayCard from '../components/ItemPlayCard';
import styles from './ItemDetails.module.scss';
import { GetItem, GetItemVariables } from './__generated__/GetItem';

const GET_ITEM = gql`
  query GetItem($id: ID!) {
    item(id: $id) {
      id
      title
      releaseDate
      thumb
      summary
    }
  }
`;

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
      <Flex
        h='100%'
        w='100%'
        flexDirection='column'
        alignItems='baseline'
        px={8}>
        <Stack direction='column' spacing={8}>
          <Stack direction='row' spacing={8}>
            <ItemPlayCard item={data?.item} />
            <Flex direction='column'>
              <Heading as='h1' size='xl' mb={0}>
                {data?.item?.title}
              </Heading>
              <Text opacity='0.8' userSelect='none' mt={0} mb={4}>
                {data?.item?.releaseDate
                  ? DateTime.fromISO(data?.item.releaseDate).toFormat('yyyy')
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
                <Tooltip label='Mark as played' placement='bottom'>
                  <IconButton
                    backgroundColor='gray.600'
                    color='white'
                    aria-label='Mark as played'
                    size='sm'
                    _hover={{ backgroundColor: 'gray.700' }}
                    icon={<Icon path={mdiCheckCircleOutline} size={1} />}
                  />
                </Tooltip>
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
                <Rating
                  fullSymbol={<Icon path={mdiStar} size={1} />}
                  emptySymbol={<Icon path={mdiCircleSmall} size={1} />}
                  className={styles.ratings}
                />
              </Stack>
              <Box maxW='500px'>
                {/* TODO: This is non-functionnal, we need to figure out how to measure the hidden text first. */}
                <Text maxH='72px' overflow='hidden'>
                  {data?.item?.summary}
                </Text>
                <Button variant='link'>Read More</Button>
              </Box>
            </Flex>
          </Stack>
        </Stack>
      </Flex>
    </Stack>
  );
}

export default ItemDetails;
