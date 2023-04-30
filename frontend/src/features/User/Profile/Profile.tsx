import { Container, Heading, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

export const Profile = () => {
  const { userId: userName } = useParams();

  return (
    <>
      <Container maxW="container.lg">
        <Heading as="h2" size="md">
          Profile
        </Heading>
        <Text>{userName}</Text>
      </Container>
    </>
  );
};
