import { Container, Heading, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const { userId: userName } = useParams();

  return (
    <>
      <Container maxW="container.lg" py="10px">
        <Heading as="h2" size="md">
          Profile
        </Heading>
        <Text>{userName}</Text>
      </Container>
    </>
  );
};

export default Profile;
