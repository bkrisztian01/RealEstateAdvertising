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
import { useCallback, useState } from 'react';
import { useAuthHeader, useAuthUser } from 'react-auth-kit';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { deleteAd, getAds } from '../../../api/adsApi';
import Loading from '../../../components/Loading';
import DeleteModal from '../../../components/Modals/DeleteModal';
import { Ad } from '../../../model/Ad';
import { ListingRow } from './ListingRow/component';
import './style.css';

export const ShowListings = () => {
  const authUser = useAuthUser();
  const authHeader = useAuthHeader();
  const userName = authUser()?.userName;

  const [adId, setAdId] = useState<number | null>(null);

  const queryClient = useQueryClient();

  const {
    isLoading,
    isError,
    error,
    data: ads,
  } = useQuery<Ad[]>('ownListings', () => getAds(userName));

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
      queryClient.invalidateQueries(`ad${adId}`);
    },
  });

  const onDelete = () => {
    mutateDelete();
    onClose();
  };

  let content;
  if (isLoading) {
    content = <Loading />;
  } else if (isError || !ads) {
    content = (
      <Heading size="md">{error instanceof Error ? error.message : ''}</Heading>
    );
  } else {
    content = (
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
          {ads?.map((ad, i) => (
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
    );
  }

  return (
    <>
      <Container maxW="container.lg">
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
