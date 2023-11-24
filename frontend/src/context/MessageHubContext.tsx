import { HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';
import { createContext, ReactNode, useRef } from 'react';
import { ReactElement } from 'react-markdown/lib/react-markdown';
import { getCookie } from 'typescript-cookie';

type MessageHub = {
  invoke: (method: string, ...args: unknown[]) => Promise<any>;
  on: (method: string, callback: (...args: any[]) => void) => void;
  off: (method: string) => void;
};

export const MessageHubContext = createContext<MessageHub | undefined>(
  undefined,
);

type ChildrenType = {
  children?: ReactNode;
};

const conn = new HubConnectionBuilder()
  .withAutomaticReconnect()
  .withUrl('https://localhost:7202/chathub', {
    accessTokenFactory: () => {
      return getCookie('_auth') || '';
    },
  })
  .build();

export const MessageHubProvider = ({
  children,
}: ChildrenType): ReactElement => {
  const connection = useRef(conn);

  const invoke = async (method: string, ...args: unknown[]): Promise<any> => {
    if (connection.current.state !== HubConnectionState.Connected) {
      await connection.current.start();
    }
    return await connection.current.invoke(method, ...args);
  };

  const on = (method: string, callback: (...args: any[]) => void) => {
    connection.current.on(method, callback);
  };

  const off = (method: string) => {
    connection.current.off(method);
  };

  return (
    <MessageHubContext.Provider
      value={{
        invoke: invoke,
        on: on,
        off: off,
      }}
    >
      {children}
    </MessageHubContext.Provider>
  );
};
