import { Heading, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

const Ad = () => {
  const { adId } = useParams();

  return (
    <>
      <Heading as="h2" size="md">
        Ad
      </Heading>
      <Text>{adId}</Text>
    </>
  );
};
export default Ad;
