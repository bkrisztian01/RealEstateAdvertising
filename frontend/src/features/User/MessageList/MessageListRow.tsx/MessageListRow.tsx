import { Center, Td, Text, Tr } from '@chakra-ui/react';
import { MessageListRowProps } from './types';

export const MessageListRow = ({
  messageContact: { user, lastMessageDate, unreadCount },
}: MessageListRowProps) => {
  return (
    <Tr>
      <Td>
        <Text>{user.fullName}</Text>
        <Text color="gray">{user.userName}</Text>
      </Td>
      <Td>
        <Center>{unreadCount}</Center>
      </Td>
      <Td>
        <Center>{lastMessageDate.toDateString()}</Center>
      </Td>
    </Tr>
  );
};
