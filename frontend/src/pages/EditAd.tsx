import { Container, Heading } from '@chakra-ui/react';
import { getAdById, updateAd } from 'api/adApi';
import { AxiosError } from 'axios';
import Loading from 'components/Loading';
import { AdForm, AdFormInput } from 'features/Ad/AdForm';
import { Ad } from 'model/Ad';
import { useCallback } from 'react';
import { useAuthHeader, useAuthUser } from 'react-auth-kit';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { toBase64 } from 'util/toBase64';
import Forbidden from './Forbidden';
import NotFound from './NotFound';

const EditAd = () => {
  const { adId } = useParams();

  const {
    isLoading: isAdLoading,
    data: ad,
    error: adError,
  } = useQuery<Ad, AxiosError>(`ad${adId}`, () => {
    const id = Number(adId);
    if (!id) {
      return Promise.reject(new Error('adId is not a number'));
    }
    return getAdById(id);
  });

  const authHeader = useAuthHeader();
  const authUser = useAuthUser();

  const mutationFn = useCallback(
    async (data: AdFormInput) => {
      if (!ad) throw Error('Ad is null');

      return updateAd(
        ad.id,
        {
          ...data,
          image:
            !!data.image && data.image.length > 0
              ? await toBase64(data.image[0])
              : ad.image,
          createdAt: ad.createdAt,
        },
        authHeader(),
      );
    },
    [ad, authHeader],
  );

  if (!!adError?.response && adError.response?.status === 404) {
    return <NotFound />;
  }

  if (!!ad && ad.owner.userName !== authUser()?.userName) {
    return <Forbidden />;
  }

  if (isAdLoading) {
    return <Loading />;
  }

  return (
    <>
      <Container maxW="container.sm">
        <Heading as="h1" mb="4">
          Edit advertisement
        </Heading>
        <AdForm mutationFn={mutationFn} ad={ad} />
      </Container>
    </>
  );
};

export default EditAd;
