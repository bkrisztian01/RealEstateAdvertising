import { Center, Container, Grid, GridItem, Heading } from '@chakra-ui/react';
import { AdList as AdListDto, getAds } from 'api/adApi';
import { AxiosError } from 'axios';
import { Loading } from 'components/Loading';
import { PageButtons } from 'components/PageButtons';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { AdCard } from './AdCard';
import { AdFilter, AdFilterFormInput } from './AdFilter';

export const AdList = () => {
  const [pageIndex, setPageIndex] = useState(1);
  const [adFilter, setAdFilter] = useState<AdFilterFormInput>();

  const { isLoading, isError, error, data, isPreviousData } = useQuery<
    AdListDto,
    AxiosError
  >({
    queryKey: ['ads', pageIndex, adFilter],
    queryFn: () => getAds({ pageIndex, ...adFilter }),
    keepPreviousData: true,
  });

  let content;
  if (isLoading) {
    return <Loading />;
  } else if (isError || !data) {
    content = <Heading>{error instanceof Error ? error.message : ''}</Heading>;
  } else {
    content = (
      <>
        <AdFilter onSubmit={(data) => setAdFilter(data)} />
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
                  <GridItem key={i}>
                    <AdCard ad={ad} />
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
      </>
    );
  }
  return (
    <Container
      maxW="container.lg"
      w="fit-content"
      p="30px"
      className="page-content"
    >
      {content}
    </Container>
  );
};
