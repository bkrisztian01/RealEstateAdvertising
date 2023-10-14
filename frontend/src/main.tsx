import { ChakraProvider } from '@chakra-ui/react';
import { MessageHubProvider } from 'context/MessagesHubContext';
import React from 'react';
import { AuthProvider } from 'react-auth-kit';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './main.css';
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
      <MessageHubProvider>
        <QueryClientProvider client={queryClient}>
          <ChakraProvider theme={theme}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ChakraProvider>
        </QueryClientProvider>
      </MessageHubProvider>
    </AuthProvider>
  </React.StrictMode>,
);

export function wait(duration: number) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}
