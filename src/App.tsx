import { ChakraProvider, Spinner } from '@chakra-ui/react';
import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import RequireAuth from './components/RequireAuth';
import Home from './pages/Home';
import Library from './pages/Library';
import Login from './pages/Login';
import theme from './theme';

function App() {
  return (
    <ChakraProvider theme={theme}>
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
          <Route path='/login' element={<Login />} />
        </Routes>
      </Suspense>
    </ChakraProvider>
  );
}

export default App;
