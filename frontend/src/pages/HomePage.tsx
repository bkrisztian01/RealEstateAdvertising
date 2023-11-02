import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { AdFilter, AdFilterFormInput } from 'features/Ad/AdList/AdFilter';
import { createSearchParams, useNavigate } from 'react-router-dom';

export const HomePage = () => {
  const navigate = useNavigate();
  const onSubmit = (filter: AdFilterFormInput) => {
    navigate({
      pathname: '/browse',
      search: createSearchParams(
        filter as unknown as Record<string, string>,
      ).toString(),
    });
  };

  return (
    <Box w="100vw" h="100vh" position="fixed">
      <Flex
        position="fixed"
        transform="translate(-50%, -50%)"
        boxSizing="border-box"
        top="50%"
        left="50%"
        justifyContent="center"
        alignItems="center"
        gap="5rem"
      >
        <Box width="50rem">
          <Flex mb="10px" alignItems="center">
            <Image src="/logo.png" height="80px"></Image>{' '}
            <Text
              fontSize="xxx-large"
              fontFamily="Mohave"
              fontWeight="500"
              color="white"
              ml="5px"
              textAlign="center"
            >
              RealEstate
            </Text>
          </Flex>
          <Box background="white" py="15px" px="20px" borderRadius="lg">
            <AdFilter onSubmit={onSubmit}></AdFilter>
          </Box>
        </Box>
        <Box
          color="white"
          fontSize="xxx-large"
          height="100%"
          fontFamily="Mohave"
        >
          Unlock Your Dream Home with Us!
        </Box>
      </Flex>
    </Box>
  );
};
