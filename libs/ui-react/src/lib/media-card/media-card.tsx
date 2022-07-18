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
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import { Link as ReactLink } from 'react-router-dom';

interface ItemCardOptions {
  item?: any;
  width: number;
  square?: boolean;
  seen?: boolean;
}

interface ItemCardProps extends PropsOf<'div'>, ItemCardOptions {}

function MediaCard({ item, width, square, seen, ...props }: ItemCardProps) {
  const [showOverlay, setShowOverlay] = useState(false);
  const overlayColor = useColorModeValue('gray.200', 'gray.800');
  const overlayIconColor = useColorModeValue('black', 'white');

  if (!square && item.__typename === 'MusicAlbum') {
    square = true;
  }

  const heightMultiplier = square ? 1 : 1.5;

  return (
    <Box
      {...props}
      display='flex'
      flexDir='column'
      alignItems='center'
      justifyContent='center'>
      <Box
        w={width}
        h={Math.round(width * heightMultiplier)}
        position='relative'
        mb={4}
        onMouseEnter={() => setShowOverlay(true)}
        onMouseLeave={() => setShowOverlay(false)}>
        <Box
          position='relative'
          w={width}
          h={Math.round(width * heightMultiplier)}>
          {item?.thumb ? (
            <Box
              borderRadius='md'
              w={width}
              maxW={width}
              h={Math.round(width * heightMultiplier)}
              maxH={Math.round(width * heightMultiplier)}
              overflow='hidden'
              shadow='md'
              bg={overlayColor}>
              <LazyLoadImage
                effect='opacity'
                alt={item?.title ?? ''}
                src={`${item.thumb}&width=260&height=390`}
                style={{ objectFit: 'cover', height: '100%', width: '100%' }}
                wrapperProps={{
                  style: {
                    width: '100%',
                    height: '100%',
                  },
                }}
              />
            </Box>
          ) : (
            <Box
              borderRadius='md'
              w={width}
              maxW={width}
              h={Math.round(width * heightMultiplier)}
              maxH={Math.round(width * heightMultiplier)}
              overflow='hidden'
              shadow='md'
              bg={overlayColor}
            />
          )}
        </Box>
        <Link
          aria-label={item?.title ?? ''}
          as={ReactLink}
          to={`/item/${item?.id}`}
          borderRadius='md'
          display='block'
          height={Math.round(width * heightMultiplier)}
          width={width}
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
        {!seen && (
          <Box
            borderRadius='md'
            display='block'
            height={Math.round(width * heightMultiplier)}
            width={width}
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
        )}
      </Box>
      <Box
        display='flex'
        flexDir='column'
        alignItems='baseline'
        w={width}
        maxW={width}
        overflow='hidden'>
        <Link
          as={ReactLink}
          to={`/item/${item?.id}`}
          fontSize='sm'
          w={width}
          maxW={width}
          lineHeight={1.2}
          noOfLines={1}>
          {item?.title}
        </Link>
        {item.__typename === 'MusicAlbum' ? (
          <Link
            as={ReactLink}
            to={`/item/${item?.artist.id}`}
            fontSize='xs'
            w={width}
            maxW={width}
            pt={1}
            opacity='0.8'
            noOfLines={1}>
            {item?.artist.name}
          </Link>
        ) : (
          <Text
            fontSize='xs'
            w={width}
            maxW={width}
            pt={1}
            opacity='0.8'
            noOfLines={1}>
            {item && 'releaseDate' in item && item?.releaseDate
              ? DateTime.fromISO(item.releaseDate).toFormat('yyyy')
              : ''}
          </Text>
        )}
      </Box>
    </Box>
  );
}

export default MediaCard;
