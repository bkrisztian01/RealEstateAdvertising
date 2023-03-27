import { Container, Heading, Text } from '@chakra-ui/react';

const NoMatch = () => {
  return (
    <Container maxWidth="container.lg">
      <Heading as="h1">404 </Heading>
      <Text>There&apos;s nothing here!</Text>
    </Container>
  );
};

export default NoMatch;
