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

type PropsType = {
  id: number;
};

const AdCard = ({ id }: PropsType) => {
  // Filler
  const { price, numberOfRooms, area } = {
    price: 100500000,
    numberOfRooms: 1,
    area: 30010,
  };

  const priceString = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);

  return (
    <LinkBox>
      <Card key="1">
        <CardBody>
          <LinkOverlay as={NavLink} to={`/ad/${id}`}>
            <Image
              src="minimalism.jpg"
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
              {numberOfRooms} {numberOfRooms === 1 ? 'Room' : 'Rooms'}
            </Text>

            <Text>{area} m2</Text>
          </HStack>
        </CardBody>
      </Card>
    </LinkBox>
  );
};

export default AdCard;
