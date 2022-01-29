import { Flex, useColorModeValue } from '@chakra-ui/react';
import { mdiHome } from '@mdi/js';
import LibraryList from './LibraryList';
import SidebarItem from './SidebarItem';

function Sidebar() {
  return (
    <Flex
      display={{ base: 'none', lg: 'flex' }}
      direction='column'
      w='16.25rem'
      minW='16.25rem'
      ml={2}
      mb={2}
      bg={useColorModeValue('gray.50', 'gray.800')}
      borderRadius='base'
      height='calc(100% - 8px)'>
      <SidebarItem to='/' icon={mdiHome}>
        Home
      </SidebarItem>
      <LibraryList />
    </Flex>
  );
}

export default Sidebar;
