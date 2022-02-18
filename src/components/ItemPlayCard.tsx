import {
  Box,
  IconButton,
  Image,
  PropsOf,
  useColorModeValue,
} from '@chakra-ui/react';
import { mdiPlay } from '@mdi/js';
import Icon from '@mdi/react';
import { useState } from 'react';
import { Item } from '@/components/ItemCard';

interface ItemCardOptions {
  item?: Item | null;
}

interface ItemCardProps extends PropsOf<'div'>, ItemCardOptions {}

function ItemPlayCard({ item, ...props }: ItemCardProps) {
  const [showOverlay, setShowOverlay] = useState(false);
  const overlayColor = useColorModeValue('gray.200', 'gray.800');

  return (
    <Box
      {...props}
      display='flex'
      flexDir='column'
      alignItems='center'
      justifyContent='center'>
      <Box
        w='240px'
        h={`${Math.round(240 * 1.5)}px`}
        position='relative'
        mb={4}
        onMouseEnter={() => setShowOverlay(true)}
        onMouseLeave={() => setShowOverlay(false)}>
        <Box position='relative' w='240px' h={`${Math.round(240 * 1.5)}px`}>
          <Image
            borderRadius='md'
            w='240px'
            maxW='240px'
            h={`${Math.round(240 * 1.5)}px`}
            maxH={`${Math.round(240 * 1.5)}px`}
            objectFit='cover'
            overflow='hidden'
            alt={item?.title ?? ''}
            src={item?.thumb ? `${item.thumb}&width=260&height=390` : ''}
            shadow='md'
          />
        </Box>
        <Box
          borderRadius='md'
          display='block'
          height={`${Math.round(240 * 1.5)}px`}
          width='240px'
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
            colorScheme='red'
            borderRadius='full'
            left='50%'
            transform='translate(-50%, -50%)'
            top='50%'
            position='absolute'
            variant='outline'
            borderWidth='3px'
            size='lg'
            aria-label={`Play ${item?.title}`}
            _hover={{
              backgroundColor: 'transparent',
            }}
            icon={<Icon path={mdiPlay} size={1.5} />}
          />
        )}
        <Box
          borderRadius='md'
          display='block'
          height={Math.round(240 * 1.5)}
          width='240px'
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
    </Box>
  );
}

export default ItemPlayCard;
