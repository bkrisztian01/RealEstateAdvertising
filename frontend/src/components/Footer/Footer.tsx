import { Box, Container, Stack, Text } from '@chakra-ui/react';
import './style.css';

export default function SmallWithSocial() {
  return (
    <Box as="footer" className="footer">
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}
      >
        <Text>© 2023 RealEstate. All rights reserved (probably)</Text>
      </Container>
    </Box>
  );
}
export const Footer = () => {
  return (
    <footer className="footer">
      <SmallWithSocial />
    </footer>
  );
};
