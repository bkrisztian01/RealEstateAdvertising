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
  useDisclosure,
} from '@chakra-ui/react';
import { useIsAuthenticated, useSignOut } from 'react-auth-kit';
import { NavLink } from 'react-router-dom';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

const NavBar = () => {
  const signOut = useSignOut();

  const {
    isOpen: isRegisterOpen,
    onOpen: onRegisterOpen,
    onClose: onRegisterClose,
  } = useDisclosure();

  const {
    isOpen: isLoginOpen,
    onOpen: onLoginOpen,
    onClose: onLoginClose,
  } = useDisclosure();

  const isAuthenticated = useIsAuthenticated();

  const SignedOutButtons = () => (
    <>
      <Button onClick={onLoginOpen}>Sign in</Button>
      <Button onClick={onRegisterOpen} colorScheme="green">
        Sign up
      </Button>
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

          <MenuItem as={NavLink} to="/home" onClick={signOut}>
            Sign out
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );

  return (
    <>
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
          {isAuthenticated() ? <SignedInButtons /> : <SignedOutButtons />}
        </HStack>
      </Flex>

      <RegisterModal
        isOpen={isRegisterOpen}
        onOpen={onRegisterOpen}
        onClose={onRegisterClose}
      />
      <LoginModal
        isOpen={isLoginOpen}
        onOpen={onLoginOpen}
        onClose={onLoginClose}
      />
    </>
  );
};

export default NavBar;
