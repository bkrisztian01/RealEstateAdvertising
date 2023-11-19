import { MessageHubContext } from 'context/MessageHubContext';
import { useContext, useEffect, useState } from 'react';
import { useAuthHeader, useIsAuthenticated } from 'react-auth-kit';

export const useNewMessageCount = () => {
  const connection = useContext(MessageHubContext);
  if (!connection) {
    throw new Error('MessageHubProvider is missing.');
  }
  const [newMessagesCount, setNewMessagesCount] = useState(0);
  const isAuthenticated = useIsAuthenticated();
  const authHeader = useAuthHeader();

  const onNewMessageCountChanged = (count: number) => {
    setNewMessagesCount(count);
  };

  useEffect(() => {
    if (!connection) return;

    connection.on('NewMessageCountChanged', onNewMessageCountChanged);

    if (isAuthenticated()) {
      connection.invoke('GetNewMessageCount').then(onNewMessageCountChanged);
    }
  }, [connection, isAuthenticated]);

  return {
    newMessagesCount: newMessagesCount,
  };
};
