import { ChakraProvider, Spinner } from '@chakra-ui/react';
import { Suspense } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';

function App() {
  return (
    <ChakraProvider>
      <HashRouter>
        <Suspense fallback={<Spinner size='xl' />}>
          <Routes>
            <Route path='/login' element={<Login />} />
          </Routes>
        </Suspense>
      </HashRouter>
    </ChakraProvider>
  );
}

export default App;
