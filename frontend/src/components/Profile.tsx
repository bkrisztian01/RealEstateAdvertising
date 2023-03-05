import { Heading, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const { userId } = useParams();

  return (
    <>
      <Heading as="h2" size="md">
        Profile
      </Heading>
      <Text>{userId}</Text>
    </>
  );
};

export default Profile;
