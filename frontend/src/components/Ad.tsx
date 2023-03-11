import { Heading, Image, Spinner, Text } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getAdById } from '../api/adsApi';
import { Ad } from '../model/Ad';

const AdPage = () => {
  const { adId } = useParams();

  const {
    isLoading,
    isError,
    error,
    data: ad,
  } = useQuery<Ad, Error>(`ad${adId}`, () => getAdById(parseInt(adId || '0')));

  let content;
  if (isLoading) {
    content = (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    );
  } else if (isError || !ad) {
    content = <Heading>{error instanceof Error ? error.message : ''}</Heading>;
  } else {
    content = (
      <>
        <Image src={ad.image} />
        <Heading as="h2" size="md">
          {ad.title}
        </Heading>
        <Text>{ad.price}</Text>
        <Text>{ad.description}</Text>
      </>
    );
  }
  return content;
};
export default AdPage;
