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
import { LoginModal } from 'features/User/LoginModal';
import { RegisterModal } from 'features/User/RegisterModal';
import { useNewMessageCount } from 'hooks/useNewMessageCount';
import { useIsAuthenticated, useSignOut } from 'react-auth-kit';
import { NavLink } from 'react-router-dom';

export const NavBar = () => {
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

  const { newMessagesCount } = useNewMessageCount();

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
        <Button>
          Messages {newMessagesCount > 0 ? `(${newMessagesCount})` : ''}
        </Button>
      </Link>

      <Menu direction="rtl">
        <MenuButton>
          <Avatar src="profile-picture.png" my="-2" />
        </MenuButton>

        <MenuList>
          <MenuItem as={NavLink} to="/create">
            Create listing
          </MenuItem>

          <MenuItem as={NavLink} to={'/listings'}>
            Show listings
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
        py="2"
        px="4"
        borderBottom="1px solid"
        borderColor="gray.200"
      >
        <Link as={NavLink} to="/home">
          <Text fontSize="3xl" fontWeight="bold">
            RealEstate
          </Text>
        </Link>

        <Spacer />

        <HStack spacing="20px">
          {isAuthenticated() ? <SignedInButtons /> : <SignedOutButtons />}
        </HStack>
      </Flex>

      <RegisterModal isOpen={isRegisterOpen} onClose={onRegisterClose} />
      <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
    </>
  );
};
