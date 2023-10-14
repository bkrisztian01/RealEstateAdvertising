import { HubConnectionState } from '@microsoft/signalr';
import { MessageHubContext } from 'context/MessagesHubContext';
import { useContext, useEffect, useState } from 'react';

export const useNewMessageCount = () => {
  const context = useContext(MessageHubContext);
  if (!context) {
    throw new Error('MessageHubProvider is missing.');
  }
  const { connection } = context;
  const [newMessagesCount, setNewMessagesCount] = useState(0);

  const onNewMessageCountChanged = (count: number) => {
    setNewMessagesCount(count);
  };

  useEffect(() => {
    if (!connection) return;

    connection.on('NewMessageCountChanged', onNewMessageCountChanged);
  }, [connection]);

  useEffect(() => {
    console.log(connection?.state);
    if (connection && connection.state === HubConnectionState.Connected) {
      connection.invoke('GetNewMessageCount').then(onNewMessageCountChanged);
    }
  }, [connection]);

  return {
    newMessagesCount: newMessagesCount,
  };
};
