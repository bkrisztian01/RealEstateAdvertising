import {
  Center,
  Container,
  Heading,
  Spinner,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useAuthUser } from 'react-auth-kit';
import { useQuery } from 'react-query';
import { getAds } from '../../api/adsApi';
import { Ad } from '../../model/Ad';
import ListingRow from './ListingRow';

const tableStyle = {
  // prettier-ignore
  'td': {
    'padding-top': '8px',
    'padding-bottom': '8px'
  },
};

const ShowListings = () => {
  const auth = useAuthUser();
  const userName = auth()?.userName;
  const {
    isLoading,
    isError,
    error,
    data: ads,
  } = useQuery<Ad[]>('ownListings', () => getAds(userName));

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
    content = (
      <Heading size="md">{error instanceof Error ? error.message : ''}</Heading>
    );
  } else {
    content = (
      <Table sx={tableStyle}>
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
            <ListingRow ad={ad} key={i} />
          ))}
        </Tbody>
      </Table>
    );
  }

  return (
    <Container maxW="container.lg">
      <Heading as="h1" mb="5">
        Your listings
      </Heading>
      {content}
    </Container>
  );
};
export default ShowListings;
