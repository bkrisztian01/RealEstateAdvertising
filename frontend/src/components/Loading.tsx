import { Center, Spinner } from '@chakra-ui/react';

const Loading = () => {
  return (
    <Center position="fixed" w="100vw" h="100vh">
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
export default Loading;
