import { Spinner } from '@chakra-ui/react';
import { Suspense } from 'react';
import { Route, Routes as RoutesList } from 'react-router-dom';

import Dashboard from '../pages/dashboard';

function Routes() {
  return (
    <Suspense fallback={<Spinner size='xl' />}>
      <RoutesList>
        <Route path='/' element={<Dashboard />} />
      </RoutesList>
    </Suspense>
  );
}

export default Routes;
