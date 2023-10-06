import { MessageHubContext } from 'context/MessagesHubContext';
import { Message } from 'model/Message';
import { useContext } from 'react';

export default function useMessageHub() {
  const messageHub = useContext(MessageHubContext);
  if (!messageHub) {
    throw new Error('MessageHubProvider is missing.');
  }
  const { connection } = messageHub;

  const sendMessage = async (message: string, userName: string) => {
    if (!connection) return;

    return connection.invoke('send', userName, message);
  };

  const addOnNewMessageHandler = (fn: (message: Message) => void) => {
    if (!connection) return;

    connection.off('NewMessage');
    connection.on('NewMessage', fn);
  };

  const removeOnNewMessageHandler = (fn: (message: Message) => void) => {
    if (!connection) return;

    connection.off('NewMessage');
  };

  const markMessagesAsRead = async (userName: string) => {
    if (!connection) return;

    return connection.invoke('markMessagesWithUserAsRead', userName);
  };

  return {
    sendMessage: sendMessage,
    addOnNewMessageHandler: addOnNewMessageHandler,
    removeOnNewMessageHandler: removeOnNewMessageHandler,
    markMessagesAsRead: markMessagesAsRead,
  };
}
