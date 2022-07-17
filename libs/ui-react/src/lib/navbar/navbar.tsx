import {
  Box,
  Flex,
  IconButton,
  Link,
  Tooltip,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { mdiMenu, mdiPlusCircle } from '@mdi/js';
import Icon from '@mdi/react';
import { FunctionComponent } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import ModalLibraryCreate from '../modal-library-create/modal-library-create';
import Logo from './logo.svg';

interface NavbarProps {
  toggleCollapsed: () => void;
}

function Navbar({ toggleCollapsed }: NavbarProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      role='banner'
      direction='row'
      flexGrow={1}
      flexShrink={1}
      justifyContent='center'
      alignItems='center'
      m={2}
      height='3rem'
      width='unset'
      bg={useColorModeValue('gray.200', 'gray.800')}
      borderRadius='base'>
      <IconButton
        variant={'unstyled'}
        aria-label='Toggle sidebar'
        mx={2}
        display={'inline-flex'}
        alignItems={'center'}
        justifyContent={'center'}
        color={useColorModeValue('gray.900', 'white')}
        opacity={0.6}
        icon={<Icon path={mdiMenu} size={1.25} />}
        _hover={{
          color: useColorModeValue('gray.600', 'white'),
          opacity: 1,
        }}
        onClick={toggleCollapsed}
      />
      <Link
        aria-label={'Go to the home page'}
        as={RouterLink}
        flexGrow={0}
        px={2}
        to='/'>
        <Box
          as={Logo as unknown as FunctionComponent}
          color={useColorModeValue('red.500', 'white')}
          height='max(1.5em, 1.5rem)'
        />
      </Link>
      <Box position='relative' display='inline-block' flexGrow={1} ml={3} />
      <Tooltip label='Add a Library'>
        <IconButton
          variant={'unstyled'}
          aria-label='Add a library'
          mx={2}
          display={'inline-flex'}
          alignItems={'center'}
          justifyContent={'center'}
          color={useColorModeValue('gray.900', 'white')}
          opacity={0.6}
          icon={<Icon path={mdiPlusCircle} size={1.25} />}
          _hover={{
            color: useColorModeValue('gray.600', 'white'),
            opacity: 1,
          }}
          onClick={onOpen}
        />
      </Tooltip>
      <ModalLibraryCreate isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
}

export default Navbar;
