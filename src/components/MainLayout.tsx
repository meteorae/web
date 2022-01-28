import { Box, Stack } from '@chakra-ui/layout';
import { Spinner, useColorModeValue } from '@chakra-ui/react';
import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Library from '../pages/Library';
import RequireAuth from './RequireAuth';
import Sidebar from './Sidebar';

function MainLayout() {
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
          <Suspense fallback={<Spinner size='xl' />}>
            <Routes>
              <Route
                path='/'
                element={
                  <RequireAuth redirectTo='/login'>
                    <Home />
                  </RequireAuth>
                }
              />
              <Route
                path='/library/:id'
                element={
                  <RequireAuth redirectTo='/login'>
                    <Library />
                  </RequireAuth>
                }
              />
            </Routes>
          </Suspense>
        </Box>
      </Stack>
    </Stack>
  );
}

export default MainLayout;
