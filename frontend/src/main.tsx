import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import { AuthProvider } from 'react-auth-kit';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
import { theme } from './Theme';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider
      authType="cookie"
      authName="_auth"
      cookieDomain={window.location.hostname}
      cookieSecure={false}
    >
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ChakraProvider>
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>,
);

export function wait(duration: number) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}
