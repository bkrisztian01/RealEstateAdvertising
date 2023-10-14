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
import { formatPrice } from 'util/formatPrice';
import { AdCardProps } from './types';

export const AdCard = ({ ad }: AdCardProps) => {
  const { id, price, roomCount, area, image, address } = ad;

  const priceString = formatPrice(price);

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
          <Heading
            mt="5"
            as="h3"
            size="sm"
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {address}
          </Heading>
          <Text mt="5px" colorScheme="green">
            {priceString}
          </Text>
          <HStack
            marginTop="5px"
            divider={<StackDivider borderColor="gray.300" />}
          >
            <Text>
              {roomCount} {roomCount === 1 ? 'Room' : 'Rooms'}
            </Text>

            <Text>
              {area} m<sup>2</sup>
            </Text>
          </HStack>
        </CardBody>
      </Card>
    </LinkBox>
  );
};
