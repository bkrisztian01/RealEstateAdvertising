import { Container, Heading } from '@chakra-ui/react';
import { createAd } from 'api/adApi';
import { AdForm, AdFormInput } from 'features/Ad/AdForm';
import { useCallback } from 'react';
import { useAuthHeader } from 'react-auth-kit';
import { toBase64 } from 'util/toBase64';

const CreatingAd = () => {
  const authHeader = useAuthHeader();

  const createAdMutationFn = useCallback(
    async (data: AdFormInput) => {
      const imageBase64 = await toBase64(data.image[0]);
      return createAd(
        { ...data, image: imageBase64, createdAt: new Date(Date.now()) },
        authHeader(),
      );
    },
    [authHeader],
  );

  return (
    <>
      <Container maxW="container.sm">
        <Heading as="h1" mb="4">
          Create advertisement
        </Heading>
        <AdForm mutationFn={createAdMutationFn} />
      </Container>
    </>
  );
};

export default CreatingAd;
