import { Container, SimpleGrid } from '@chakra-ui/react';
import AdCard from './AdCard';

const AdList = () => {
  return (
    <Container maxW="container.lg">
      <SimpleGrid spacing={5} minChildWidth="300px">
        {[...Array(5)].map((x, i) => {
          return <AdCard id={i} key={i} />;
        })}
      </SimpleGrid>
    </Container>
  );
};

export default AdList;
