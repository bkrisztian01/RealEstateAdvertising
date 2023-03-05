import {
  Avatar,
  Button,
  Flex,
  HStack,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spacer,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const SignedOutButtons = () => (
    <>
      <Button onClick={() => setLoggedIn(true)}>Sign in</Button>
      <Button colorScheme="green">Sign up</Button>
    </>
  );

  const SignedInButtons = () => (
    <>
      <Link as={NavLink} to="/messages">
        <Button>Messages</Button>
      </Link>

      <Menu direction="rtl">
        <MenuButton>
          <Avatar src="profile-picture.png" my="-2" />
        </MenuButton>

        <MenuList>
          <MenuItem as={NavLink} to="/create">
            Create listing
          </MenuItem>

          <MenuItem>Show listings</MenuItem>

          <MenuItem as={NavLink} to="/profile/1">
            Show Profile
          </MenuItem>

          <MenuDivider />

          <MenuItem as={NavLink} to="/home" onClick={() => setLoggedIn(false)}>
            Sign out
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );

  return (
    <Flex
      as="nav"
      alignItems="center"
      gap="20px"
      marginBottom="40px"
      py="2"
      px="4"
      borderBottom="1px solid"
      borderColor="gray.200"
    >
      <Link as={NavLink} to="/home">
        <Text fontSize="3xl" fontWeight="bold">
          LOGO
        </Text>
      </Link>

      <Spacer />

      <HStack spacing="20px">
        {loggedIn ? <SignedInButtons /> : <SignedOutButtons />}
      </HStack>
    </Flex>
  );
};

export default NavBar;
