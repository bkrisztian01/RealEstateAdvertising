import {
  Center,
  Container,
  Heading,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import { AdList, deleteAd, getAds } from 'api/adApi';
import Loading from 'components/Loading';
import { DeleteModal } from 'components/Modals/DeleteModal';
import { PageButtons } from 'components/PageButtons';
import { useCallback, useState } from 'react';
import { useAuthHeader, useAuthUser } from 'react-auth-kit';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { ListingRow } from './ListingRow/ListingRow';
import './style.css';

export const ShowListings = () => {
  const authUser = useAuthUser();
  const authHeader = useAuthHeader();
  const userName = authUser()?.userName;

  const [adId, setAdId] = useState<number | null>(null);
  const [pageIndex, setPageIndex] = useState(1);

  const queryClient = useQueryClient();

  const { isLoading, isError, error, data, isPreviousData } = useQuery<AdList>({
    queryKey: ['ownListings', pageIndex],
    queryFn: () => getAds({ userName, pageIndex }),
    keepPreviousData: true,
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  const mutationFn = useCallback(
    async (_: void) => {
      if (!adId) return Promise.reject(new Error('adId is not a number'));

      return deleteAd(adId, authHeader());
    },
    [adId, authHeader],
  );

  const { mutate: mutateDelete } = useMutation({
    mutationFn,
    onSuccess: (_) => {
      queryClient.invalidateQueries('ownListings');
      queryClient.invalidateQueries(['ad', adId]);
    },
  });

  const onDelete = () => {
    mutateDelete();
    onClose();
  };

  let content;
  if (isLoading) {
    return <Loading />;
  } else if (isError || !data) {
    content = (
      <Heading size="md">{error instanceof Error ? error.message : ''}</Heading>
    );
  } else {
    content = (
      <>
        <Table>
          <col span={1} width="60%" />
          <col span={1} width="20%" />
          <col span={1} width="20%" />

          <Thead>
            <Tr>
              <Th>Listing</Th>
              <Th>
                <Center>Creation date</Center>
              </Th>
              <Th>
                <Center>Actions</Center>
              </Th>
            </Tr>
          </Thead>

          <Tbody>
            {data?.ads.map((ad, i) => (
              <ListingRow
                ad={ad}
                key={i}
                onDeleteButtonClick={() => {
                  setAdId(ad.id);
                  onOpen();
                }}
              />
            ))}
          </Tbody>
        </Table>

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
    <>
      <Container className="content-wrap" maxW="container.lg">
        <Heading as="h1" mb="5">
          Your listings
        </Heading>
        {content}
      </Container>
      <DeleteModal
        isOpen={isOpen}
        onClose={onClose}
        onDeleteConfirmed={onDelete}
      />
    </>
  );
};
