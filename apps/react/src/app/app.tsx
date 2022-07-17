import { ApolloProvider } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Provider as ReduxProvider } from 'react-redux';
import { HistoryRouter } from 'redux-first-history/rr6';

import apolloClient from './apolloClient';
import Routes from './routes';
import { history, store } from './store';
import theme from './theme';

export function App() {
  return (
    <ReduxProvider store={store}>
      <HistoryRouter history={history}>
        <ApolloProvider client={apolloClient}>
          <HelmetProvider>
            <ChakraProvider theme={theme}>
              <Helmet titleTemplate={`%s | Meteorae`} defaultTitle='Meteorae' />
              <Routes />
            </ChakraProvider>
          </HelmetProvider>
        </ApolloProvider>
      </HistoryRouter>
    </ReduxProvider>
  );
}

export default App;
