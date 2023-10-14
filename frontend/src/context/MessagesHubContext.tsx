import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { useAuthHeader, useIsAuthenticated } from 'react-auth-kit';
import { ReactElement } from 'react-markdown/lib/react-markdown';

type MessageHub = {
  connection: HubConnection | undefined;
  stopConnection: () => void;
};

export const MessageHubContext = createContext<MessageHub | undefined>(
  undefined,
);

type ChildrenType = {
  children?: ReactNode;
};

export const MessageHubProvider = ({
  children,
}: ChildrenType): ReactElement => {
  const authHeader = useAuthHeader();
  const isAuthenticated = useIsAuthenticated();
  const [connection, setConnection] = useState<HubConnection | undefined>(
    undefined,
  );
  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withAutomaticReconnect()
      .withUrl('https://localhost:7202/chathub', {
        accessTokenFactory: () => {
          return authHeader().split(' ')[1];
        },
      })
      .build();

    if (isAuthenticated()) {
      connection.start().then(() => {
        console.log('Connected to MessageHub');
        setConnection(connection);
      });
    }

    return () => {
      connection.stop();
      setConnection(undefined);
    };
  }, []);

  const stopConnection = () => {
    connection?.stop();
    setConnection(undefined);
  };

  return (
    <MessageHubContext.Provider
      value={{
        connection,
        stopConnection,
      }}
    >
      {children}
    </MessageHubContext.Provider>
  );
};
