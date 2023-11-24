import {
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  Image,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { getAdById } from 'api/adApi';
import { AxiosError } from 'axios';
import { Loading } from 'components/Loading';
import { MessageModal } from 'components/MessageModal';
import { MessageFormInput } from 'components/MessageModal/MessageModal';
import useMessageHub from 'hooks/useMessageHub';
import { Ad } from 'model/Ad';
import { useAuthUser, useIsAuthenticated } from 'react-auth-kit';
import { SubmitHandler } from 'react-hook-form';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { FaRulerVertical } from 'react-icons/fa';
import { GoPerson } from 'react-icons/go';
import { ImLocation2, ImPriceTag } from 'react-icons/im';
import { MdBed, MdEmail } from 'react-icons/md';
import { useQuery, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { formatPrice } from 'util/formatPrice';
import './style.css';

export const AdPage = () => {
  const { adId } = useParams();

  const isAuthenticated = useIsAuthenticated();
  const queryClient = useQueryClient();
  const auth = useAuthUser();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    isLoading,
    isError,
    error,
    data: ad,
  } = useQuery<Ad, AxiosError>(
    ['ad', adId],
    () => getAdById(parseInt(adId || '0')),
    {
      onError: (error) => {
        if (error.response?.status === 404) {
          navigate('/404');
        }
      },
    },
  );

  const { sendMessage } = useMessageHub();
  const messageHeader = `__Advertisement:__ [__${ad?.title}__](/ad/${adId})\n\n\n`;
  let isSendLoading = false;
  const onSubmit: SubmitHandler<MessageFormInput> = async (
    data: MessageFormInput,
  ) => {
    if (!ad) {
      return;
    }
    isSendLoading = true;
    await sendMessage(messageHeader + data.content, ad.owner.userName).finally(
      () => (isSendLoading = false),
    );
    await queryClient.invalidateQueries([ad?.owner.userName, 'messages']);
    navigate(`/messages/${ad?.owner.userName}`);
    onClose();
  };

  const details = (ad: Ad) => (
    <>
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
          {ad.roomCount > 1 ? `${ad.roomCount} rooms` : `${ad.roomCount} room`}
        </Text>
      </HStack>
    </>
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
        {ad?.owner.phoneNumber && (
          <HStack className="detail">
            <Icon as={BsFillTelephoneFill}></Icon>
            <Text>{ad?.owner.phoneNumber}</Text>
          </HStack>
        )}
        {isAuthenticated() && auth()?.userName !== ad?.owner.userName && (
          <Button
            className="contact-button"
            colorScheme="green"
            size="md"
            onClick={onOpen}
          >
            Message advertiser
          </Button>
        )}
      </Box>
    </>
  );

  let content;
  if (isLoading) {
    return <Loading />;
  } else if (isError || !ad) {
    content = <Heading>{error instanceof Error ? error.message : ''}</Heading>;
  } else {
    content = (
      <>
        <Grid
          w={{ lg: 'calc(100% - 10px)', base: '100%' }}
          templateRows="repeat(2, 1fr)"
          templateColumns={{ lg: '70% 30%', base: '100%' }}
          gap="10px"
        >
          <GridItem
            colSpan={1}
            rowSpan={2}
            height={{ lg: '500px', md: '500px', base: '300px' }}
            className="image-container"
          >
            <Image className="ad-image" src={ad.image} />
          </GridItem>
          <GridItem className="panel details-container" colSpan={1}>
            {details(ad)}
          </GridItem>
          <GridItem className="panel" colSpan={1}>
            {contacts}
          </GridItem>
        </Grid>

        <Box className="panel" mt="30px">
          <Heading as="h2" size="md">
            About This Home
          </Heading>
          <Text className="display-linebreak" mt="10px">
            {ad.description}
          </Text>
        </Box>

        <MessageModal
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={onSubmit}
          isLoading={isSendLoading}
        />
      </>
    );
  }
  return (
    <Container className="page-content" p="30" maxW="container.lg">
      {content}
    </Container>
  );
};
