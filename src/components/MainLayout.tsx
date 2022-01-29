import { Box, Container, Flex, Stack } from '@chakra-ui/layout';
import { Spinner, useColorModeValue } from '@chakra-ui/react';
import { Fragment, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Library from '../pages/Library';
import RequireAuth from './RequireAuth';
import Sidebar from './Sidebar';

function MainLayout() {
  return (
    <Fragment>
      <Box
        m={2}
        height='3rem'
        bg={useColorModeValue('gray.50', 'gray.800')}
        borderRadius='base'>
        Header
      </Box>
      <Flex position='relative' h='100%' flexGrow='1'>
        <Flex direction='row' w='100%'>
          <Sidebar />

          <Flex
            direction='column'
            grow='1'
            height='100%'
            pos='relative'
            overflowX='hidden'>
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
          </Flex>
        </Flex>
      </Flex>
    </Fragment>
  );
}

export default MainLayout;
