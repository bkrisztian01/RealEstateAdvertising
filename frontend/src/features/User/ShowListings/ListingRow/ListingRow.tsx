import {
  ButtonGroup,
  Center,
  Grid,
  GridItem,
  Icon,
  IconButton,
  Image,
  Td,
  Text,
  Tr,
} from '@chakra-ui/react';
import { MdDelete, MdOutlineEdit } from 'react-icons/md';
import { NavLink, useNavigate } from 'react-router-dom';
import { ListingRowProps } from './types';

export const ListingRow = ({ ad, onDeleteButtonClick }: ListingRowProps) => {
  const { id, title, address, image, createdAt } = ad;

  const createdAtString = createdAt.toLocaleDateString();

  const navigate = useNavigate();

  const onEditButtonClick = () => {
    navigate(`/ad/${ad.id}/edit`);
  };

  return (
    <Tr>
      <Td>
        <Grid templateRows="repeat(2, 1ft)" templateColumns="repeat(6, 1fr)">
          <GridItem rowSpan={2} colSpan={1} mr="4" width="auto">
            <Image
              src={image}
              fallbackSrc="blank-house.png"
              alt="house"
              height="60px"
              width="100%"
              borderRadius="sm"
              objectFit="cover"
            />
          </GridItem>
          <GridItem mt="auto" mb="auto" rowSpan={1} colSpan={5}>
            <NavLink to={`/ad/${id}`}>{title}</NavLink>
          </GridItem>
          <GridItem mt="auto" mb="auto" rowSpan={1} colSpan={5}>
            <Text color="gray.600">{address}</Text>
          </GridItem>
        </Grid>
      </Td>
      <Td>
        <Center>{createdAtString}</Center>
      </Td>
      <Td>
        <Center>
          <ButtonGroup isAttached>
            <IconButton
              aria-label="Edit listing"
              icon={<Icon as={MdOutlineEdit} />}
              onClick={onEditButtonClick}
            />
            <IconButton
              colorScheme="red"
              aria-label="Remove listing"
              onClick={onDeleteButtonClick}
              icon={<Icon as={MdDelete} color="#fff" />}
            />
          </ButtonGroup>
        </Center>
      </Td>
    </Tr>
  );
};
