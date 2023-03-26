import {
  Center,
  Container,
  Heading,
  SimpleGrid,
  Spinner,
} from '@chakra-ui/react';
import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { getAds } from '../api/adsApi';
import { Ad } from '../model/Ad';
import AdCard from './AdCard';

const AdList = () => {
  const {
    isLoading,
    isError,
    error,
    data: ads,
  } = useQuery<Ad[], AxiosError>('ads', () => getAds());

  let content;
  if (isLoading) {
    content = (
      <Center>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Center>
    );
  } else if (isError || !ads) {
    content = <Heading>{error instanceof Error ? error.message : ''}</Heading>;
  } else {
    content = (
      <Container maxW="container.lg" py="10px">
        <Center>
          <SimpleGrid spacing={5} columns={{ base: 1, md: 2, lg: 3 }}>
            {ads.map((ad, i) => {
              return (
                <>
                  <AdCard ad={ad} key={i} />
                </>
              );
            })}
          </SimpleGrid>
        </Center>
      </Container>
    );
  }

  return <Container maxW="container.lg">{content}</Container>;
};

export default AdList;
