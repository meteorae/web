import {
  Box,
  Flex,
  useColorModeValue,
  Link,
  IconButton,
} from '@chakra-ui/react';
import { mdiMenu } from '@mdi/js';
import Icon from '@mdi/react';
import { Link as RouterLink } from 'react-router-dom';
import { ReactComponent as Logo } from './logo.svg';

interface NavbarProps {
  toggleCollapsed: () => void;
}

function Navbar({ toggleCollapsed }: NavbarProps) {
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
      bg={useColorModeValue('grayTransparent.50', 'grayTransparent.800')}
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
      <Link as={RouterLink} flexGrow={0} px={2} to='/'>
        <Box as={Logo} height='max(1.5em, 1.5rem)' />
      </Link>
      <Box position='relative' display='inline-block' flexGrow={1} ml={3} />
    </Flex>
  );
}

export default Navbar;
