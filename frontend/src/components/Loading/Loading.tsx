import { Center, Spinner } from '@chakra-ui/react';
import './style.css';

export const Loading = () => {
  return (
    <Center height="100%">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Center>
  );
};
