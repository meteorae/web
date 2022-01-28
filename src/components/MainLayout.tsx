import { Box, Stack } from '@chakra-ui/layout';
import { useColorModeValue } from '@chakra-ui/react';
import Sidebar from './Sidebar';

interface MainLayoutProps {
  children: React.ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
  return (
    <Stack h='100%' w='100%' spacing='0'>
      <Box
        m={2}
        height='3rem'
        bg={useColorModeValue('gray.50', 'gray.800')}
        borderRadius='base'>
        Header
      </Box>
      <Stack flexGrow='1' direction='row' spacing='0'>
        <Sidebar />
        <Box h='100%' w='100%'>
          {children}
        </Box>
      </Stack>
    </Stack>
  );
}

export default MainLayout;
