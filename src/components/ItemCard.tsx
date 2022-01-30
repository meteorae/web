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

export interface Item {
  __typename: 'Movie';
  id?: string;
  title?: string;
  releaseDate?: number;
  thumb?: string;
  art?: string;
}

interface ItemCardOptions {
  item?: Item | null;
}

interface ItemCardProps extends PropsOf<'div'>, ItemCardOptions {}

function ItemCard({ item, ...props }: ItemCardProps) {
  const [showOverlay, setShowOverlay] = useState(false);
  const overlayColor = useColorModeValue('gray.200', 'gray.800');
  const overlayIconColor = useColorModeValue('black', 'white');

  return (
    <Box
      {...props}
      overflow='hidden'
      display='flex'
      flexDir='column'
      alignItems='center'
      justifyContent='center'>
      <Box
        w='160px'
        h='240px'
        position='relative'
        overflow='hidden'
        mb={4}
        onMouseEnter={() => setShowOverlay(true)}
        onMouseLeave={() => setShowOverlay(false)}>
        <Box position='relative' overflow='hidden' w='160px' h='240px'>
          <Image
            borderRadius='md'
            w='160px'
            maxW='160px'
            h='240px'
            maxH='240px'
            objectFit='cover'
            overflow='hidden'
            alt={item?.title ?? ''}
            src={item?.thumb ? `${item.thumb}&width=240&height=360` : ''}
            shadow='base'
          />
        </Box>
        <Link
          aria-label={item?.title ?? ''}
          as={ReactLink}
          to={`/item/${item?.id}`}
          borderRadius='md'
          display='block'
          height='240px'
          width='160px'
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
          height='240px'
          width='160px'
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
        w='160px'
        maxW='160px'
        overflow='hidden'>
        <Link
          as={ReactLink}
          to={`/item/${item?.id}`}
          fontSize='xs'
          w='160px'
          maxW='160px'
          isTruncated>
          {item?.title}
        </Link>
        <Text
          fontSize='xs'
          w='160px'
          maxW='160px'
          opacity='0.8'
          userSelect='none'>
          {item?.releaseDate
            ? DateTime.fromSeconds(item.releaseDate).toFormat('yyyy')
            : ''}
        </Text>
      </Box>
    </Box>
  );
}

export default ItemCard;
