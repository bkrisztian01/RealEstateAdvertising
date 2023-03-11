import {
  Card,
  CardBody,
  Heading,
  HStack,
  Image,
  LinkBox,
  LinkOverlay,
  StackDivider,
  Text,
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { Ad } from '../model/Ad';

type PropsType = {
  ad: Ad;
};

const AdCard = ({ ad }: PropsType) => {
  const { id, price, roomCount, area, image } = ad;

  const priceString = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);

  return (
    <LinkBox>
      <Card width="300px">
        <CardBody>
          <LinkOverlay as={NavLink} to={`/ad/${id}`}>
            <Image
              src={image}
              fallbackSrc="blank-house.png"
              alt="house"
              height="200px"
              width="100%"
              borderRadius="lg"
              objectFit="cover"
            />
          </LinkOverlay>
          <Heading mt="5" as="h3" size="md">
            {priceString}
          </Heading>

          <HStack
            marginTop="5px"
            divider={<StackDivider borderColor="gray.300" />}
          >
            <Text>
              {roomCount} {roomCount === 1 ? 'Room' : 'Rooms'}
            </Text>

            <Text>{area} m2</Text>
          </HStack>
        </CardBody>
      </Card>
    </LinkBox>
  );
};

export default AdCard;
