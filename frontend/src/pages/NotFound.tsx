import { Container, Heading, Text } from '@chakra-ui/react';

const NotFound = () => {
  return (
    <Container maxWidth="container.lg" py="10px">
      <Heading as="h1">404</Heading>
      <Text>There&apos;s nothing here!</Text>
    </Container>
  );
};

export default NotFound;
