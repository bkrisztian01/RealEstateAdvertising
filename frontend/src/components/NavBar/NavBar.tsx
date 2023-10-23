import {
  Avatar,
  Button,
  Flex,
  HStack,
  Image,
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
import { SuccessfulModal } from 'components/Modals/SuccessfulModal';
import { LoginModal } from 'features/User/LoginModal';
import { RegisterModal } from 'features/User/RegisterModal';
import { SubscriptionModal } from 'features/User/Subscription/SubscriptionModal';
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

  const {
    isOpen: isSubscriptionOpen,
    onOpen: onSubscriptionOpen,
    onClose: onSubscriptionClose,
  } = useDisclosure();

  const {
    isOpen: isSubscriptionSuccessOpen,
    onOpen: onSubscriptionSuccessOpen,
    onClose: onSubscriptionSuccessClose,
  } = useDisclosure();

  const onSubscriptionSuccess = () => {
    onSubscriptionClose();
    onSubscriptionSuccessOpen();
  };

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
          <MenuItem as={NavLink} to={'/create'}>
            Create listing
          </MenuItem>

          <MenuItem as={NavLink} to={'/listings'}>
            Show listings
          </MenuItem>

          <MenuItem as={NavLink} onClick={onSubscriptionOpen}>
            Manage subscription
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
        height="62px"
        borderBottom="1px solid"
        borderColor="gray.200"
        background="white"
      >
        <Link as={NavLink} to="/home">
          <Flex>
            <Image src="/logo.jpg" height="42px"></Image>{' '}
            <Text
              fontSize="3xl"
              fontFamily="Mohave"
              fontWeight="500"
              ml="5px"
              textAlign="center"
            >
              RealEstate
            </Text>
          </Flex>
        </Link>

        <Spacer />

        <HStack spacing="20px">
          {isAuthenticated() ? <SignedInButtons /> : <SignedOutButtons />}
        </HStack>
      </Flex>

      <RegisterModal isOpen={isRegisterOpen} onClose={onRegisterClose} />
      <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
      <SubscriptionModal
        isOpen={isSubscriptionOpen}
        onClose={onSubscriptionClose}
        onSubscriptionSuccess={onSubscriptionSuccess}
      ></SubscriptionModal>
      <SuccessfulModal
        isOpen={isSubscriptionSuccessOpen}
        text="You subscribed!"
        onClose={onSubscriptionSuccessClose}
      ></SuccessfulModal>
    </>
  );
};
