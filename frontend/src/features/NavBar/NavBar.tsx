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
import { getNewMessageCount } from 'api/messageApi';
import { LoginModal } from 'features/User/LoginModal';
import { RegisterModal } from 'features/User/RegisterModal';
import {
  useAuthHeader,
  useAuthUser,
  useIsAuthenticated,
  useSignOut,
} from 'react-auth-kit';
import { useQuery } from 'react-query';
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

  const isAuthenticated = useIsAuthenticated();
  const auth = useAuthUser();
  const authHeader = useAuthHeader();

  const { data } = useQuery({
    queryKey: 'newMessageCount',
    queryFn: () => getNewMessageCount(authHeader()),
    enabled: isAuthenticated(),
  });

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
        <Button>Messages {data?.count > 0 ? `(${data?.count})` : ''}</Button>
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

          <MenuItem as={NavLink} to={`/profile/${auth()?.userName}`}>
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
