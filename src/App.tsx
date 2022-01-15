import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import styled, { css, ThemeProvider } from 'styled-components';
import ClipLoader from 'react-spinners/ClipLoader';

import GlobalStyle from './components/GlobalStyle';
import useDarkMode from './hooks/useDarkMode';
import Home from './pages/Home';
import Onboarding from './pages/Onboarding';
import Login from './pages/Login';
import { darkTheme, lightTheme } from './themes';
import { FullPageContainer } from './components/LayoutDialog';
import { themeGet } from '@styled-system/theme-get';

const LoadingText = styled.div`
  font-size: ${themeGet('fontSizes.2')};
  margin-top: ${themeGet('space.2')};
`;

function App() {
  const [darkMode, setDarkMode] = useDarkMode();

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Suspense
        fallback={
          <FullPageContainer>
            <ClipLoader />
            <LoadingText>Loading...</LoadingText>
          </FullPageContainer>
        }>
        <Routes>
          <Route path='/onboarding/*' element={<Onboarding />} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Home />} />
        </Routes>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
