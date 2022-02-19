import {
  Box,
  IconButton,
  Image,
  Link,
  PropsOf,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { mdiPlay } from '@mdi/js';
import Icon from '@mdi/react';
import { DateTime } from 'luxon';
import { useState } from 'react';
import { Link as ReactLink } from 'react-router-dom';
import { useAppSelector } from '@/app/hooks';
import { GetLatestHubs_latest_items } from '@/graphql/__generated__/GetLatestHubs';
import { GetItems_items_items } from '@/graphql/__generated__/GetItems';
import { GetChildren_children_items } from '@/graphql/__generated__/GetChildren';
interface ItemCardOptions {
  item?:
    | GetLatestHubs_latest_items
    | GetItems_items_items
    | GetChildren_children_items
    | null;
}

interface ItemCardProps extends PropsOf<'div'>, ItemCardOptions {}

function ItemCard({ item, ...props }: ItemCardProps) {
  const [showOverlay, setShowOverlay] = useState(false);
  const overlayColor = useColorModeValue('gray.200', 'gray.800');
  const overlayIconColor = useColorModeValue('black', 'white');
  const cardWidth = useAppSelector((state) => state.settings.cardSize);

  return (
    <Box
      {...props}
      display='flex'
      flexDir='column'
      alignItems='center'
      justifyContent='center'>
      <Box
        w={cardWidth}
        h={Math.round(cardWidth * 1.5)}
        position='relative'
        mb={4}
        onMouseEnter={() => setShowOverlay(true)}
        onMouseLeave={() => setShowOverlay(false)}>
        <Box position='relative' w={cardWidth} h={Math.round(cardWidth * 1.5)}>
          <Image
            borderRadius='md'
            w={cardWidth}
            maxW={cardWidth}
            h={Math.round(cardWidth * 1.5)}
            maxH={Math.round(cardWidth * 1.5)}
            objectFit='cover'
            overflow='hidden'
            alt={item?.title ?? ''}
            src={item?.thumb ? `${item.thumb}&width=260&height=390` : ''}
            shadow='md'
          />
        </Box>
        <Link
          aria-label={item?.title ?? ''}
          as={ReactLink}
          to={`/item/${item?.id}`}
          borderRadius='md'
          display='block'
          height={Math.round(cardWidth * 1.5)}
          width={cardWidth}
          left='50%'
          transform='translate(-50%, -50%)'
          top='50%'
          position='absolute'
          backgroundColor={showOverlay ? overlayColor : 'transparent'}
          opacity={showOverlay ? 0.8 : 0}
          borderWidth={showOverlay ? '1px' : '0'}
          borderColor={showOverlay ? 'red.500' : 'transparent'}
        />
        {showOverlay && (
          <IconButton
            colorScheme={overlayIconColor}
            borderRadius='full'
            left='50%'
            transform='translate(-50%, -50%)'
            top='50%'
            position='absolute'
            variant='outline'
            borderWidth='3px'
            size='lg'
            aria-label={`Play ${item?.title}`}
            icon={<Icon path={mdiPlay} size={1.5} />}
          />
        )}
        <Box
          borderRadius='md'
          display='block'
          height={Math.round(cardWidth * 1.5)}
          width={cardWidth}
          left='50%'
          transform='translate(-50%, -50%)'
          top='50%'
          overflow='hidden'
          pointerEvents='none'
          position='absolute'>
          <Box
            backgroundColor='red.500'
            h='28px'
            position='absolute'
            right='-14px'
            top='-14px'
            transform='rotate(45deg)'
            width='28px'
          />
        </Box>
      </Box>
      <Box
        display='flex'
        flexDir='column'
        alignItems='baseline'
        w={cardWidth}
        maxW={cardWidth}
        overflow='hidden'>
        <Link
          as={ReactLink}
          to={`/item/${item?.id}`}
          fontSize='xs'
          w={cardWidth}
          maxW={cardWidth}
          isTruncated>
          {item?.title}
        </Link>
        <Text
          fontSize='xs'
          w={cardWidth}
          maxW={cardWidth}
          opacity='0.8'
          userSelect='none'>
          {item && 'releaseDate' in item && item?.releaseDate
            ? DateTime.fromISO(item.releaseDate).toFormat('yyyy')
            : ''}
        </Text>
      </Box>
    </Box>
  );
}

export default ItemCard;
