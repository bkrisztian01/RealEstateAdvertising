import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  GridItem,
  Heading,
  Input,
  InputGroup,
  InputRightAddon,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  SimpleGrid,
  Textarea,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import { useAuthHeader } from 'react-auth-kit';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { createAd } from '../api/adsApi';
import { Ad } from '../model/Ad';
import { toBase64 } from '../util/toBase64';
import FileUpload from './FileUpload';

export type AdFormInput = {
  title: string;
  description: string;
  address: string;
  price: number;
  roomCount: number;
  area: number;
  image: FileList;
};

const listingSchema = yup.object<AdFormInput>({
  title: yup.string().required('Title is required.'),
  description: yup.string(),
  address: yup.string().required('Address is required.'),
  price: yup.number().required('Price is required.'),
  roomCount: yup.number().required('Room count is required.'),
  area: yup.number().required('Area is required.'),
  image: yup.mixed<FileList>().required('Image is required.'),
});

const CreatingAd = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdFormInput>({
    resolver: yupResolver(listingSchema),
  });

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const auth = useAuthHeader();

  const { mutate, isError, error, isLoading } = useMutation<
    Ad,
    AxiosError,
    AdFormInput
  >({
    mutationFn: async (data) => {
      const imageBase64 = await toBase64(data.image[0]);
      return createAd(
        { ...data, image: imageBase64, createdAt: new Date(Date.now()) },
        auth(),
      );
    },
    onSuccess: (ad) => {
      navigate(`/ad/${ad.id}`);
      queryClient.invalidateQueries('ads');
    },
  });

  const onSubmit: SubmitHandler<AdFormInput> = (data: AdFormInput) => {
    mutate(data);
  };

  const adForm = (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SimpleGrid columns={{ base: 2, sm: 1 }} columnGap={2} rowGap={2}>
        <GridItem colSpan={2}>
          <FormControl isInvalid={!!errors.title}>
            <FormLabel>Title</FormLabel>
            <Input {...register('title')} />
            <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
          </FormControl>
        </GridItem>

        <GridItem colSpan={2}>
          <FormControl isInvalid={!!errors.description}>
            <FormLabel>Description</FormLabel>
            <Textarea
              fontSize="md"
              {...register('description')}
              size="sm"
              rounded="md"
            />
            <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
          </FormControl>
        </GridItem>

        <GridItem colSpan={2}>
          <FormControl isInvalid={!!errors.address}>
            <FormLabel>Address</FormLabel>
            <Input {...register('address')} />
            <FormErrorMessage>{errors.address?.message}</FormErrorMessage>
          </FormControl>
        </GridItem>

        <GridItem colSpan={2}>
          <FormControl isInvalid={!!errors.price}>
            <FormLabel>Price</FormLabel>
            <NumberInput min={0} defaultValue={0}>
              <NumberInputField {...register('price')} />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <FormErrorMessage>{errors.price?.message}</FormErrorMessage>
          </FormControl>
        </GridItem>

        <GridItem colSpan={1}>
          <FormControl isInvalid={!!errors.roomCount}>
            <FormLabel>Room count</FormLabel>
            <NumberInput min={1} defaultValue={1}>
              <NumberInputField {...register('roomCount')} />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <FormErrorMessage>{errors.roomCount?.message}</FormErrorMessage>
          </FormControl>
        </GridItem>

        <GridItem colSpan={1}>
          <FormControl isInvalid={!!errors.area}>
            <FormLabel>Area</FormLabel>
            <InputGroup>
              <NumberInput min={1} defaultValue={1}>
                <NumberInputField {...register('area')} />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <InputRightAddon>
                m<sup>2</sup>
              </InputRightAddon>
            </InputGroup>
            <FormErrorMessage>{errors.area?.message}</FormErrorMessage>
          </FormControl>
        </GridItem>

        <GridItem colSpan={2}>
          <FormControl isInvalid={!!errors.image}>
            <FormLabel>Image</FormLabel>
            <FileUpload
              register={register('image')}
              accept="image/*"
            ></FileUpload>
            <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
          </FormControl>
        </GridItem>

        <GridItem colSpan={2} mt="4">
          <Button
            type="submit"
            w="100%"
            colorScheme="green"
            isLoading={isLoading}
          >
            Submit
          </Button>
        </GridItem>

        <GridItem>
          <FormControl isInvalid={isError}>
            <FormErrorMessage>{error?.message}</FormErrorMessage>
          </FormControl>
        </GridItem>
      </SimpleGrid>
    </form>
  );

  return (
    <>
      <Container maxW="container.sm" py="10px">
        <Heading as="h1" mb="4">
          Create advertisement
        </Heading>
        {adForm}
      </Container>
    </>
  );
};

export default CreatingAd;
