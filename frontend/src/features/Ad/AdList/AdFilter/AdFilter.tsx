import {
  Button,
  Grid,
  GridItem,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Menu,
  MenuButton,
  MenuList,
} from '@chakra-ui/react';
import { AiOutlineMinus, AiOutlineSearch } from 'react-icons/ai';
import { BiChevronDown } from 'react-icons/bi';
import './style.css';

export const AdFilter = () => {
  return (
    <Grid
      templateColumns={{ md: 'repeat(2, 1fr)', sm: '1fr' }}
      templateRows={{ base: 'repeat(2, 1fr)' }}
    >
      <GridItem colSpan={{ base: 1, md: 2 }}>
        <InputGroup>
          <InputLeftElement>
            <Icon as={AiOutlineSearch} />
          </InputLeftElement>
          <Input placeholder="Search address" />
        </InputGroup>
      </GridItem>
      <GridItem colSpan={1} mb="10px">
        <HStack>
          <Menu closeOnSelect={false}>
            <MenuButton as={Button} rightIcon={<BiChevronDown />}>
              Price
            </MenuButton>
            <MenuList p="10px">
              <HStack>
                <InputGroup>
                  <InputLeftElement color="gray.300">$</InputLeftElement>
                  <Input placeholder="Min" htmlSize={9} />
                </InputGroup>
                <AiOutlineMinus />
                <InputGroup>
                  <InputLeftElement color="gray.300">$</InputLeftElement>
                  <Input placeholder="Max" htmlSize={9} />
                </InputGroup>
              </HStack>
            </MenuList>
          </Menu>

          <Menu closeOnSelect={false}>
            <MenuButton as={Button} rightIcon={<BiChevronDown />}>
              Area
            </MenuButton>
            <MenuList p="10px">
              <HStack>
                <InputGroup>
                  <Input placeholder="Min" htmlSize={6} />
                  <InputRightElement color="gray.300">
                    m<sup>2</sup>
                  </InputRightElement>
                </InputGroup>
                <AiOutlineMinus />
                <InputGroup>
                  <Input placeholder="Max" htmlSize={6} />
                  <InputRightElement color="gray.300">
                    m<sup>2</sup>
                  </InputRightElement>
                </InputGroup>
              </HStack>
            </MenuList>
          </Menu>

          <Menu closeOnSelect={false}>
            <MenuButton as={Button} rightIcon={<BiChevronDown />}>
              Rooms
            </MenuButton>
            <MenuList p="10px">
              <HStack>
                <Input placeholder="Min" htmlSize={8} />
                <AiOutlineMinus />
                <Input placeholder="Max" htmlSize={8} />
              </HStack>
            </MenuList>
          </Menu>
        </HStack>
      </GridItem>
      <GridItem
        colSpan={1}
        className="second-row"
        justifyContent="right"
        display="flex"
        mb="10px"
      >
        <Button
          colorScheme="green"
          w={{ base: '100%', md: 'auto', lg: 'auto' }}
        >
          Search
        </Button>
      </GridItem>
    </Grid>
  );
};
