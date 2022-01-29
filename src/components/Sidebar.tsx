import { Box, useColorModeValue } from '@chakra-ui/react';
import { mdiHome } from '@mdi/js';
import LibraryList from './LibraryList';
import SidebarItem from './SidebarItem';

function Sidebar() {
  return (
    <Box
      flexGrow='1'
      w='16.25rem'
      ml={2}
      mb={2}
      bg={useColorModeValue('gray.50', 'gray.800')}
      borderRadius='base'>
      <SidebarItem to='/' icon={mdiHome}>
        Home
      </SidebarItem>
      <LibraryList />
    </Box>
  );
}

export default Sidebar;
