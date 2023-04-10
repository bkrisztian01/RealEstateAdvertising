import { Container, Heading, Text } from '@chakra-ui/react';

const Forbidden = () => {
  return (
    <Container maxWidth="container.lg">
      <Heading as="h1">403</Heading>
      <Text>Forbidden!</Text>
    </Container>
  );
};

export default Forbidden;
