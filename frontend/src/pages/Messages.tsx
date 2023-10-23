import { Container, Heading } from '@chakra-ui/react';
import { MessageList } from 'features/User/MessageList';

const Messages = () => {
  return (
    <>
      <Container className="page-content" p="30px" maxW="container.lg">
        <Heading as="h1" mb="5">
          Messages
        </Heading>
        <MessageList />
      </Container>
    </>
  );
};

export default Messages;
