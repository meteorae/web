import { Spinner } from '@chakra-ui/react';
import { Suspense } from 'react';
import { Route, Routes as RoutesList } from 'react-router-dom';

import MainLayout from '../components/main-layout';
import Dashboard from '../pages/dashboard';
import Library from '../pages/library';

function Routes() {
  return (
    <MainLayout>
      <Suspense fallback={<Spinner size='xl' />}>
        <RoutesList>
          <Route path='/' element={<Dashboard />} />
          <Route path='/media/library/:id' element={<Library />} />
        </RoutesList>
      </Suspense>
    </MainLayout>
  );
}

export default Routes;
