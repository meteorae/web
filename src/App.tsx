import { ChakraProvider, Spinner } from '@chakra-ui/react';
import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import GlobalStyle from './components/GlobalStyle';
import { FullPageContainer } from './components/LayoutDialog';
import Home from './pages/Home';
import Login from './pages/Login';
import Onboarding from './pages/Onboarding';

function App() {
  return (
    <ChakraProvider>
      <GlobalStyle />
      <Suspense
        fallback={
          <FullPageContainer>
            <Spinner size='xl' />
          </FullPageContainer>
        }>
        <Routes>
          <Route path='/onboarding/*' element={<Onboarding />} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Home />} />
        </Routes>
      </Suspense>
    </ChakraProvider>
  );
}

export default App;
