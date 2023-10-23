import { Box } from '@chakra-ui/react';
import { Footer } from 'components/Footer';
import { NavBar } from 'components/NavBar';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <>
      <Box className="background"> </Box>
      <Box className="page-container">
        <NavBar />
        <main>
          <Outlet />
        </main>
        <Footer />
      </Box>
    </>
  );
};
