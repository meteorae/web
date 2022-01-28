import { Box, Image, PropsOf, Text } from '@chakra-ui/react';
import { DateTime } from 'luxon';
import { GetItems_items_items } from '../pages/__generated__/GetItems';

interface ItemCardOptions {
  item?: GetItems_items_items | null;
}

interface ItemCardProps extends PropsOf<'div'>, ItemCardOptions {}

function ItemCard({ item, ...props }: ItemCardProps) {
  return (
    <Box
      {...props}
      overflow='hidden'
      display='flex'
      flexDir='column'
      alignItems='center'
      justifyContent='center'>
      <Image
        borderRadius='md'
        w='160px'
        maxW='160px'
        h='240px'
        maxH='240px'
        mb={4}
        objectFit='cover'
        overflow='hidden'
        alt={item?.title ?? ''}
        src={`/image/transcode?url=/metadata/${item?.id}/thumb`}
        shadow='base'
      />
      <Box
        display='flex'
        flexDir='column'
        alignItems='baseline'
        w='160px'
        maxW='160px'
        overflow='hidden'>
        <Text fontSize='xs' w='160px' maxW='160px' isTruncated>
          {item?.title}
        </Text>
        <Text fontSize='xs' w='160px' maxW='160px' opacity='0.6'>
          {item?.releaseDate
            ? DateTime.fromSeconds(item.releaseDate).toFormat('yyyy')
            : ''}
        </Text>
      </Box>
    </Box>
  );
}

export default ItemCard;
