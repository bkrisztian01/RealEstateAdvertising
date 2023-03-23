import { Container, Heading } from '@chakra-ui/react';
import AdForm from './AdForm';

// const style = {
//   '.chakra-form-control': {
//     marginTop: 3,
//   },
//   '.chakra-form-control:first-child': {
//     marginTop: 0,
//   },
// };

const CreatingListing = () => {
  return (
    <>
      <Container maxW="container.sm" py="10px">
        <Heading as="h1" mb="4">
          Create listing
        </Heading>
        <AdForm />
      </Container>
    </>
  );
};

export default CreatingListing;
