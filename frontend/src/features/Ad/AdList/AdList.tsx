import { Center, Container, Heading, SimpleGrid } from '@chakra-ui/react';
import { AdList as AdListDto, getAds } from 'api/adsApi';
import { AxiosError } from 'axios';
import Loading from 'components/Loading';
import { PageButtons } from 'components/PageButtons';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { AdCard } from './AdCard';

export const AdList = () => {
  const [pageIndex, setPageIndex] = useState(1);

  const { isLoading, isError, error, data, isPreviousData } = useQuery<
    AdListDto,
    AxiosError
  >({
    queryKey: ['ads', pageIndex],
    queryFn: () => getAds({ pageIndex }),
    keepPreviousData: true,
  });

  let content;
  if (isLoading) {
    content = <Loading />;
  } else if (isError || !data) {
    content = <Heading>{error instanceof Error ? error.message : ''}</Heading>;
  } else {
    content = (
      <Container maxW="container.lg" py="10px">
        <Center>
          <SimpleGrid spacing={5} columns={{ base: 1, md: 2, lg: 3 }}>
            {data.ads.map((ad, i) => {
              return (
                <>
                  <AdCard ad={ad} key={i} />
                </>
              );
            })}
          </SimpleGrid>
        </Center>
        <Center>
          <PageButtons
            onPreviousClick={() => {
              setPageIndex((prev) => Math.max(1, prev - 1));
            }}
            onNextClick={() => {
              setPageIndex((prev) => prev + 1);
            }}
            prevDisabled={pageIndex === 1}
            nextDisabled={isPreviousData || !data?.hasMore}
          >
            {pageIndex}
          </PageButtons>
        </Center>
      </Container>
    );
  }

  return <Container maxW="container.lg">{content}</Container>;
};
