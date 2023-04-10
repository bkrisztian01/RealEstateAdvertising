import { Container, Heading } from '@chakra-ui/react';
import { useCallback } from 'react';
import { useAuthHeader } from 'react-auth-kit';
import { createAd } from '../api/adsApi';
import { AdForm, AdFormInput } from '../features/Ad/AdForm';
import { toBase64 } from '../util/toBase64';

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
      <Container maxW="container.sm" py="10px">
        <Heading as="h1" mb="4">
          Create advertisement
        </Heading>
        <AdForm mutationFn={createAdMutationFn} />
      </Container>
    </>
  );
};

export default CreatingAd;
