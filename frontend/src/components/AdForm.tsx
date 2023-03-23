import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  GridItem,
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
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { createAd } from '../api/adsApi';
import { Ad } from '../model/Ad';
import { toBase64 } from '../util/toBase64';
import FileUpload from './FileUpload';

type AdFormInput = {
  title: string;
  description: string;
  address: string;
  price: number;
  roomCount: number;
  area: number;
  image: FileList;
};

const createListingSchema = yup.object<AdFormInput>({
  title: yup.string().required('Title is required.'),
  description: yup.string(),
  address: yup.string().required('Address is required.'),
  price: yup.number().required('Price is required.'),
  roomCount: yup.number().required('Room count is required.'),
  area: yup.number().required('Area is required.'),
  // image: yup.string().required(),
});

// type PropsType = {
//   mutationFn:
// }

const AdForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdFormInput>({
    resolver: yupResolver(createListingSchema),
  });

  const auth = useAuthHeader();

  const navigate = useNavigate();

  const { mutate, isLoading, isError, error, isSuccess } = useMutation<
    Ad,
    AxiosError,
    AdFormInput
  >({
    mutationFn: async (data: AdFormInput) => {
      const imageBase64 = await toBase64(data.image[0]);
      return createAd({ ...data, image: imageBase64 }, auth()).then((ad) => {
        navigate(`/ad/${ad.id}`);
        return ad;
      });
    },
  });

  const onSubmit: SubmitHandler<AdFormInput> = (data: AdFormInput) => {
    mutate(data);
  };

  // if (isSuccess) {
  //   return <Redirect to={`/ad/${data.id}`} />;
  // }

  return (
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
              <NumberInput max={50} min={1} defaultValue={1}>
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
};
export default AdForm;
