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
import { useEffect, useMemo, useState } from 'react';
import { useAuthHeader } from 'react-auth-kit';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';
import { getAdById, updateAd } from '../api/adsApi';
import { Ad } from '../model/Ad';
import { toBase64 } from '../util/toBase64';
import FileUpload from './FileUpload';
import NoMatch from './NoMatch';

const listingSchema = yup.object<AdFormInput>({
  title: yup.string().required('Title is required.'),
  description: yup.string(),
  address: yup.string().required('Address is required.'),
  price: yup.number().required('Price is required.'),
  roomCount: yup.number().required('Room count is required.'),
  area: yup.number().required('Area is required.'),
  image: yup.mixed<FileList>(),
});

export type AdFormInput = {
  title: string;
  description: string;
  address: string;
  price: number;
  roomCount: number;
  area: number;
  image?: FileList;
};

const EditAd = () => {
  const { adId } = useParams();

  const [ad, setAd] = useState<Ad | undefined>(undefined);
  const [notFound, setNotFound] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdFormInput>({
    resolver: yupResolver(listingSchema),
    values: useMemo(() => {
      return !ad ? undefined : { ...ad, image: undefined };
    }, [ad]),
  });

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const auth = useAuthHeader();

  const mutationFn = async (data: AdFormInput) => {
    if (!ad) throw Error('Ad is null');

    return updateAd(
      ad.id,
      {
        ...data,
        image:
          !!data.image && data.image.length > 0
            ? await toBase64(data.image[0])
            : ad.image,
        createdAt: ad.createdAt,
      },
      auth(),
    );
  };

  const { mutate, isError, error, isLoading } = useMutation<
    Ad,
    AxiosError,
    AdFormInput
  >({
    mutationFn,
    onSuccess: (ad) => {
      navigate(`/ad/${ad.id}`);
      queryClient.invalidateQueries('ads');
    },
  });

  const onSubmit: SubmitHandler<AdFormInput> = (data: AdFormInput) => {
    mutate(data);
  };

  useEffect(() => {
    async function f() {
      if (!Number(adId)) {
        setNotFound(true);
        return;
      }
      const ad = await getAdById(Number(adId));
      if (!ad) {
        setNotFound(true);
        return;
      }
      setAd(ad);
    }
    f();
  }, [adId]);

  if (notFound) {
    return <NoMatch />;
  }

  const adForm = (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SimpleGrid columns={{ base: 2, sm: 1 }} columnGap={2} rowGap={2}>
        <GridItem colSpan={2}>
          <FormControl isInvalid={!!errors.title}>
            <FormLabel>Title</FormLabel>
            <Input {...register('title')} defaultValue={ad?.title} />
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
              defaultValue={ad?.description}
            />
            <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
          </FormControl>
        </GridItem>

        <GridItem colSpan={2}>
          <FormControl isInvalid={!!errors.address}>
            <FormLabel>Address</FormLabel>
            <Input {...register('address')} defaultValue={ad?.address} />
            <FormErrorMessage>{errors.address?.message}</FormErrorMessage>
          </FormControl>
        </GridItem>

        <GridItem colSpan={2}>
          <FormControl isInvalid={!!errors.price}>
            <FormLabel>Price</FormLabel>
            <NumberInput min={0} defaultValue={ad?.price || 0}>
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
            <NumberInput min={1} defaultValue={ad?.roomCount || 1}>
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
              <NumberInput min={1} defaultValue={ad?.area || 1}>
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
          Edit advertisement
        </Heading>
        {adForm}
      </Container>
    </>
  );
};

export default EditAd;
