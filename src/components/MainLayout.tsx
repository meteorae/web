import RequireAuth from '@/components/RequireAuth';
import Sidebar from '@/components/Sidebar';
import useLocalStorage from '@/hooks/useLocalStorage';
import Home from '@/pages/Home';
import ItemDetails from '@/pages/ItemDetails';
import Library from '@/pages/Library';
import { Flex } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/react';
import { Fragment, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import Navbar from './Navbar';

function MainLayout() {
  const [collapsed, setCollapsed] = useLocalStorage('sidebarCollapsed', false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Fragment>
      <Navbar toggleCollapsed={toggleCollapsed} />
      <Flex position='relative' h='100%' flexGrow='1'>
        <Flex direction='row' w='100%'>
          <Sidebar collapsed={collapsed} />

          <Flex
            role='main'
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
                <Route
                  path='/item/:id'
                  element={
                    <RequireAuth redirectTo='/login'>
                      <ItemDetails />
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
