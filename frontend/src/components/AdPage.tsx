import {
  Box,
  Center,
  Container,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  Image,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { AxiosError } from 'axios';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { FaRulerVertical } from 'react-icons/fa';
import { GoPerson } from 'react-icons/go';
import { ImLocation2, ImPriceTag } from 'react-icons/im';
import { MdBed, MdEmail } from 'react-icons/md';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getAdById } from '../api/adsApi';
import { Ad } from '../model/Ad';
import { formatPrice } from '../util/formatPrice';
import './adPage.css';

const AdPage = () => {
  const { adId } = useParams();

  const {
    isLoading,
    isError,
    error,
    data: ad,
  } = useQuery<Ad, AxiosError>(`ad${adId}`, () =>
    getAdById(parseInt(adId || '0')),
  );

  const contacts = (
    <>
      <Box className="contacts-container">
        <Heading as="h2" size="md" mb="8px">
          Contacts
        </Heading>
        <HStack className="detail">
          <Icon as={GoPerson}></Icon>
          <Box>
            <Text>{ad?.owner.fullName}</Text>
            <Text color="gray">{ad?.owner.userName}</Text>
          </Box>
        </HStack>
        <HStack className="detail">
          <Icon as={MdEmail}></Icon>
          <Text>{ad?.owner.email}</Text>
        </HStack>
        <HStack className="detail">
          <Icon as={BsFillTelephoneFill}></Icon>
          <Text>{ad?.owner.phoneNumber}</Text>
        </HStack>
      </Box>
    </>
  );

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
  } else if (isError || !ad) {
    content = <Heading>{error instanceof Error ? error.message : ''}</Heading>;
  } else {
    content = (
      <>
        <Container maxW="container.lg">
          <Grid
            w="100%"
            templateRows="1fr"
            templateColumns={{ xl: '70% 30%', lg: '70% 30%', base: '100%' }}
            gap="10px"
          >
            <GridItem
              colSpan={1}
              height={{ lg: '450px', md: '450px', base: '300px' }}
              className="image-container"
            >
              <Image className="ad-image" src={ad.image} />
            </GridItem>
            <GridItem colSpan={1}>
              <Box className="details-container">
                <Heading as="h2" size="md" mb="8px">
                  {ad.title}
                </Heading>
                <HStack className="detail">
                  <Icon as={ImLocation2}></Icon>
                  <Text>{ad.address}</Text>
                </HStack>
                <HStack className="detail">
                  <Icon as={ImPriceTag}></Icon>
                  <Text>{formatPrice(ad.price)}</Text>
                </HStack>
                <HStack className="detail">
                  <Icon as={FaRulerVertical}></Icon>
                  <Text>
                    {`${ad.area} m`}
                    <sup>2</sup>
                  </Text>
                </HStack>
                <HStack className="detail">
                  <Icon as={MdBed}></Icon>
                  <Text>
                    {ad.roomCount > 1
                      ? `${ad.roomCount} rooms`
                      : `${ad.roomCount} room`}
                  </Text>
                </HStack>
              </Box>
              {contacts}
            </GridItem>
          </Grid>

          <Heading as="h2" mt="20px" size="md">
            About This Home
          </Heading>
          <Text className="display-linebreak" mt="10px">
            {ad.description}
          </Text>
        </Container>
      </>
    );
  }
  return content;
};
export default AdPage;
