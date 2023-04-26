import { Center, Td, Text, Tr } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { MessageListRowProps } from './types';

export const MessageListRow = ({
  messageContact: { user, lastMessageDate, unreadCount },
}: MessageListRowProps) => {
  return (
    <Tr>
      <Td>
        <NavLink to={`./${user.userName}`}>
          <Text>{user.fullName}</Text>
          <Text color="gray">{user.userName}</Text>
        </NavLink>
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
