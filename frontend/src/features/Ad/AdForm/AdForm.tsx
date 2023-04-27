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
import { FileUpload } from 'components/FileUpload';
import { Ad } from 'model/Ad';
import { useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { AdFormInput, AdFormProps } from './types';

function dataURLtoFile(dataurl: string, filename = 'image') {
  const arr = dataurl.split(',');
  const mimeRegex = arr[0].match(/:(.*?);/);
  if (!mimeRegex) throw Error('Invalid base64 data URL');
  const mime = mimeRegex[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

const adSchema = yup.object<AdFormInput>({
  title: yup.string().label('Title').required(),
  description: yup.string(),
  address: yup.string().label('Address').required(),
  price: yup.number().label('Price').required(),
  roomCount: yup.number().label('Room count').required(),
  area: yup.number().label('Area').required(),
  image: yup
    .mixed<FileList>()
    .test(
      'isUploaded',
      'Image is required.',
      (value, testContext) => (value?.length || -1) > 0,
    ),
});

export const AdForm = ({ mutationFn, ad }: AdFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdFormInput>({
    resolver: yupResolver(adSchema),
    mode: 'onChange',
    values: useMemo(() => {
      if (!ad) {
        return undefined;
      }
      const dT = new DataTransfer();
      const imageFile = dataURLtoFile(ad?.image);
      dT.items.add(imageFile);
      return { ...ad, image: dT.files };
    }, [ad]),
  });

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutate, isError, error, isLoading } = useMutation<
    Ad,
    AxiosError,
    AdFormInput
  >({
    mutationFn,
    onSuccess: (ad) => {
      navigate(`/ad/${ad.id}`);
      queryClient.invalidateQueries('ads');
      queryClient.invalidateQueries(`ad${ad.id}`);
    },
  });

  const onSubmit: SubmitHandler<AdFormInput> = (data: AdFormInput) => {
    mutate(data);
  };

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
              isInvalid={!!errors.description}
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
            <FormErrorMessage>{errors.image?.message}</FormErrorMessage>
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
