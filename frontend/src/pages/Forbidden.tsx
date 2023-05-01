import { Container, Heading, Text } from '@chakra-ui/react';

const Forbidden = () => {
  return (
    <Container py="20px" maxWidth="container.lg">
      <Heading as="h1">403</Heading>
      <Text>Forbidden!</Text>
    </Container>
  );
};

export default Forbidden;
