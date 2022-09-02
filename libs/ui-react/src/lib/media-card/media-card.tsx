import {
  Box,
  Flex,
  IconButton,
  Link,
  PropsOf,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  mdiAccount,
  mdiBookmarkBoxMultiple,
  mdiCamera,
  mdiDisc,
  mdiFilmstrip,
  mdiHelp,
  mdiMagnify,
  mdiPlay,
  mdiTelevisionClassic,
  mdiVideo,
} from '@mdi/js';
import Icon from '@mdi/react';
import { DateTime } from 'luxon';
import { memo, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import { Link as ReactLink } from 'react-router-dom';

import { Item, Maybe, Movie } from '@meteorae/graphql-types';

interface ItemCardOptions {
  item?: Maybe<Movie>;
  width: number;
  square?: boolean;
  seen?: boolean;
}

function getIconFromItemType(type: string): string {
  switch (type) {
    case 'movie':
      return mdiFilmstrip;
    case 'MusicAlbumItem':
    case 'MusicMediumItem':
    case 'MusicTrackItem':
      return mdiDisc;
    case 'TVSeasonItem':
    case 'TVShowItem':
    case 'TVEpisodeItem':
      return mdiTelevisionClassic;
    case 'ImageItem':
    case 'ImageAlbumItem':
      return mdiCamera;
    case 'VideoClipItem':
      return mdiVideo;
    case 'PersonItem':
      return mdiAccount;
    case 'CollectionItem':
      return mdiBookmarkBoxMultiple;
    default:
      return mdiHelp;
  }
}

interface ItemCardProps extends PropsOf<'div'>, ItemCardOptions {}

function MediaCard({ item, width, square, seen, ...props }: ItemCardProps) {
  const [showOverlay, setShowOverlay] = useState(false);
  const fallbackColor = useColorModeValue('gray.300', 'gray.700');
  const overlayColor = useColorModeValue('gray.200', 'gray.800');
  const overlayIconColor = useColorModeValue('black', 'white');

  if (
    !square &&
    ['MusicAlbumItem', 'MusicMediumItem', 'MusicTrackItem'].includes(
      item?.__typename ?? '',
    )
  ) {
    square = true;
  }

  const heightMultiplier = square ? 1 : 1.5;

  const imageUrl = item?.thumb?.url ?? false;

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
          {imageUrl ? (
            <Box
              borderRadius='md'
              w={width}
              maxW={width}
              h={Math.round(width * heightMultiplier)}
              maxH={Math.round(width * heightMultiplier)}
              overflow='hidden'
              shadow='md'
              bg={fallbackColor}>
              <LazyLoadImage
                effect='opacity'
                alt={item?.title ?? ''}
                src={`${imageUrl}&width=260&height=390`}
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
              bg={fallbackColor}>
              <Flex
                color={overlayColor}
                left='50%'
                transform='translate(-50%, -50%)'
                top='50%'
                position='absolute'>
                <Icon
                  path={getIconFromItemType(item?.__typename ?? '')}
                  size={3.5}
                />
              </Flex>
            </Box>
          )}
        </Box>
        <Link
          as={ReactLink}
          to={`/item/${item?.id}`}
          aria-label={item?.title ?? ''}
          role='link'
          borderRadius='md'
          display='block'
          height={Math.round(width * heightMultiplier)}
          width={width}
          left='50%'
          transform='translate(-50%, -50%)'
          top='50%'
          position='absolute'
          backgroundColor={
            showOverlay || item?.isRefreshing ? overlayColor : 'transparent'
          }
          opacity={showOverlay || item?.isRefreshing ? 0.8 : 0}
          borderWidth={showOverlay ? '1px' : '0'}
          borderColor={showOverlay ? 'red.500' : 'transparent'}
        />
        {item?.isRefreshing && !showOverlay && (
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
            icon={<Icon path={mdiMagnify} size={1.5} />}
          />
        )}
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
          title={item?.title}
          role='link'
          fontSize='sm'
          w={width}
          maxW={width}
          lineHeight={1.2}
          noOfLines={1}>
          {item?.title}
        </Link>
        {item?.__typename === 'Movie' ? (
          <Link
            as={ReactLink}
            to={`/item/${item?.id}`}
            title={item?.title}
            role='link'
            fontSize='xs'
            h={6}
            w={width}
            maxW={width}
            pt={1}
            opacity='0.8'
            noOfLines={1}>
            {item?.title}
          </Link>
        ) : (
          <Text
            fontSize='xs'
            h={6}
            w={width}
            maxW={width}
            pt={1}
            opacity='0.8'
            noOfLines={1}>
            {item && 'startDate' in item && item?.startDate
              ? DateTime.fromISO(item.startDate).toFormat('yyyy')
              : ''}
          </Text>
        )}
      </Box>
    </Box>
  );
}

export default memo(MediaCard);
