import { GetItem } from '@/graphql/__generated__/GetItem';
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Stack,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { mdiCheckCircleOutline, mdiPencil, mdiPlay } from '@mdi/js';
import { Icon } from '@mdi/react';
import { DateTime } from 'luxon';
import ItemPlayCard from './ItemPlayCard';

interface ItemDetailGenericProps {
  item: GetItem['item'];
}

function ItemDetailGeneric({ item }: ItemDetailGenericProps) {
  return (
    <Flex h='100%' w='100%' flexDirection='column' alignItems='baseline' px={8}>
      <Stack direction='column' spacing={8}>
        <Stack direction='row' spacing={8}>
          <ItemPlayCard item={item} />
          <Flex direction='column'>
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
            </Stack>
            <Box maxW='500px'>
              {/* TODO: This is non-functionnal, we need to figure out how to measure the hidden text first. */}
              <Text maxH='72px' overflow='hidden'>
                {item?.summary}
              </Text>
              <Button variant='link'>Read More</Button>
            </Box>
          </Flex>
        </Stack>
      </Stack>
    </Flex>
  );
}

export default ItemDetailGeneric;
