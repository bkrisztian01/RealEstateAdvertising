import { Container, Heading } from '@chakra-ui/react';
import AdForm from './AdForm';

const CreatingAd = () => {
  return (
    <>
      <Container maxW="container.sm" py="10px">
        <Heading as="h1" mb="4">
          Create advertisement
        </Heading>
        <AdForm />
      </Container>
    </>
  );
};

export default CreatingAd;
