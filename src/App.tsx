import { Spinner, useColorModeValue, useTheme } from '@chakra-ui/react';
import { Fragment, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import RequireAuth from './components/RequireAuth';
import Home from './pages/Home';
import Library from './pages/Library';
import Login from './pages/Login';
import { Helmet } from 'react-helmet';

function App() {
  const theme = useTheme();
  theme;

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
    </Fragment>
  );
}

export default App;
