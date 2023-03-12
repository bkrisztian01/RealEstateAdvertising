import {
  Center,
  Container,
  Heading,
  SimpleGrid,
  Spinner,
} from '@chakra-ui/react';
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
  } = useQuery<Ad[], Error>('ads', getAds);
  // const queryClient = useQueryClient();

  // const addAdMutation = useMutation(addAd, {
  //   onSuccess: () => {
  //     // Invalidates and refetch
  //     queryClient.invalidateQueries('asd');
  //   },
  // });

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
      <Center>
        <SimpleGrid spacing={5} columns={{ base: 1, md: 2, lg: 3 }}>
          {ads.map((x, i) => {
            return (
              <>
                <AdCard ad={x} key={i} />
              </>
            );
          })}
        </SimpleGrid>
      </Center>
    );
  }

  return <Container maxW="container.lg">{content}</Container>;
};

export default AdList;
