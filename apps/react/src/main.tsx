import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import startsWith from 'lodash-es/startsWith';
import { StrictMode, useEffect } from 'react';
import * as ReactDOM from 'react-dom/client';
import {
  createRoutesFromChildren,
  matchRoutes,
  useLocation,
  useNavigationType,
} from 'react-router-dom';

import App from './app/app';
import { environment } from './environments/environment';

if (environment.production) {
  Sentry.init({
    dsn: 'https://a05604c1938145b49cb316bcc0059db1@o725130.ingest.sentry.io/6150698',
    integrations: [
      new BrowserTracing({
        routingInstrumentation: Sentry.reactRouterV6Instrumentation(
          useEffect,
          useLocation,
          useNavigationType,
          createRoutesFromChildren,
          matchRoutes,
        ),
      }),
    ],
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

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- Required by React 18
const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
