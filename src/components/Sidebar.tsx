import { Box, useColorModeValue } from '@chakra-ui/react';
import LibraryList from './LibraryList';

function Sidebar() {
  return (
    <Box
      flexGrow='1'
      w='16.25rem'
      ml={2}
      mb={2}
      bg={useColorModeValue('gray.50', 'gray.800')}
      borderRadius='base'>
      <LibraryList />
    </Box>
  );
}

export default Sidebar;
