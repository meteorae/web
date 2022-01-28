import { Spinner, useColorModeValue, useTheme } from '@chakra-ui/react';
import { Fragment, Suspense } from 'react';
import { Helmet } from 'react-helmet';
import { Route, Routes } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Login from './pages/Login';

function App() {
  const theme = useTheme();

  return (
    <Fragment>
      <Helmet>
        <meta
          name='theme-color'
          content={useColorModeValue(
            theme.colors.gray['100'],
            theme.colors.gray['900'],
          )}></meta>
      </Helmet>
      <Suspense fallback={<Spinner size='xl' />}>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/*' element={<MainLayout />} />
        </Routes>
      </Suspense>
    </Fragment>
  );
}

export default App;
