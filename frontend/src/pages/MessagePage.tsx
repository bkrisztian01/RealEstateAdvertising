import { Container } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

export const MessagePage = () => {
  const { userName } = useParams();

  return (
    <Container maxW="container.lg" py="10px">
      MessagePage
    </Container>
  );
};
