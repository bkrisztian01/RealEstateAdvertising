import { Center, Container, Grid, GridItem, Heading } from '@chakra-ui/react';
import { AdList as AdListDto, getAds } from 'api/adsApi';
import { AxiosError } from 'axios';
import Loading from 'components/Loading';
import { PageButtons } from 'components/PageButtons';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { AdCard } from './AdCard';
import { AdFilter } from './AdFilter';

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
      <Container maxW="container.lg" py="10px" w="fit-content">
        <AdFilter />
        <Center w="fit-content">
          <Grid
            gap={5}
            width="fit-content"
            templateColumns={{
              base: 'repeat(1, 1fr)',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)',
            }}
          >
            {data.ads.map((ad, i) => {
              return (
                <>
                  <GridItem>
                    <AdCard ad={ad} key={i} />
                  </GridItem>
                </>
              );
            })}
          </Grid>
        </Center>
        <Center>
          <PageButtons
            onPreviousClick={() => {
              setPageIndex((prev) => Math.max(1, prev - 1));
              window.scrollTo(0, 0);
            }}
            onNextClick={() => {
              setPageIndex((prev) => prev + 1);
              window.scrollTo(0, 0);
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
