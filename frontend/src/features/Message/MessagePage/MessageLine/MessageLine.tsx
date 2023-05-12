import { Box, Text } from '@chakra-ui/react';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import { useAuthUser } from 'react-auth-kit';
import ReactMarkdown from 'react-markdown';
import './style.css';
import { MessageLineProps } from './types';

function padTo2Digits(num: number) {
  return num.toString().padStart(2, '0');
}

export const MessageLine = ({ message }: MessageLineProps) => {
  const auth = useAuthUser();

  return (
    <Box
      className={
        message.fromUser.userName === auth()?.userName
          ? 'own-message message'
          : 'message'
      }
    >
      <Box className="content">
        <ReactMarkdown components={ChakraUIRenderer()}>
          {message.content}
        </ReactMarkdown>
      </Box>
      <Text as="span" color="gray.500" fontSize="sm" className="time">
        {padTo2Digits(message.date.getHours()) +
          ':' +
          padTo2Digits(message.date.getMinutes())}{' '}
        {message.date.toLocaleDateString()}
      </Text>
    </Box>
  );
};
