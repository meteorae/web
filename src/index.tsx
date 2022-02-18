import '@/app/i18n';

import App from '@/App';
import apolloClient from '@/app/apolloClient';
import { history, store } from '@/app/store';
import theme from '@/theme';
import { ApolloProvider } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import startsWith from 'lodash-es/startsWith';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HistoryRouter } from 'redux-first-history/rr6';

if (!process.env.NODE_ENV || process.env.NODE_ENV !== 'development') {
  Sentry.init({
    dsn: 'https://a05604c1938145b49cb316bcc0059db1@o725130.ingest.sentry.io/6150698',
    // TODO: Should setup React Router DOM v6 instrumentation here
    // https://github.com/getsentry/sentry-javascript/issues/4118
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1.0,
    beforeSend(event) {
      // Avoid sending the URL of the current server
      if (event.request?.url) {
        if (startsWith(event.request.url, 'https://')) {
          event.request.url = 'https://[redacted]';
        } else {
          event.request.url = 'http://[redacted]';
        }
      }

      return event;
    },
  });
}

ReactDOM.render(
  <Provider store={store}>
    <HistoryRouter history={history}>
      <ApolloProvider client={apolloClient}>
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </ApolloProvider>
    </HistoryRouter>
  </Provider>,
  document.getElementById('root'),
);
