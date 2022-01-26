import { ChakraProvider, Spinner } from '@chakra-ui/react';
import { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RequireAuth from './components/RequireAuth';
import Home from './pages/Home';
import Login from './pages/Login';

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
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
            <Route path='/login' element={<Login />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
