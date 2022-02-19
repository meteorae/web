import { Flex, useColorModeValue } from '@chakra-ui/react';
import { mdiHome } from '@mdi/js';
import LibraryList from '@/components/LibraryList';
import SidebarItem from '@/components/SidebarItem';

function Sidebar() {
  return (
    <Flex
      role='navigation'
      display={{ base: 'none', lg: 'flex' }}
      direction='column'
      w='16.25rem'
      minW='16.25rem'
      ml={2}
      mb={2}
      bg={useColorModeValue('grayTransparent.50', 'grayTransparent.800')}
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
