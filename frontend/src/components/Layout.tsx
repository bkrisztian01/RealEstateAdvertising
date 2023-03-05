import { Container } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

export const Layout = () => {
  return (
    <>
      <NavBar />
      <Container maxW="container.lg" py="10px">
        <Outlet />
      </Container>
    </>
  );
};
