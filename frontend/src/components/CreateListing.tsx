import {
  Button,
  Container,
  FormControl,
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
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import FileUpload from './FileUpload';

type FormInput = {
  title: string;
  description: string;
  address: string;
  price: number;
  roomCount: number;
  area: number;
  image: FileList;
};

const createListingSchema = yup.object<FormInput>({
  title: yup.string().required(),
  description: yup.string().required(),
  address: yup.string().required(),
  price: yup.number().required(),
  roomCount: yup.number().required(),
  area: yup.number().required(),
  // image: yup.string().required(),
});

// const style = {
//   '.chakra-form-control': {
//     marginTop: 3,
//   },
//   '.chakra-form-control:first-child': {
//     marginTop: 0,
//   },
// };

const CreatingListing = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormInput>({
    resolver: yupResolver(createListingSchema),
  });

  // const { mutate, isLoading, isError, error } = useMutation<
  //   unknown,
  //   AxiosError
  // >((data) => {
  //   return data;
  // });

  const onSubmit: SubmitHandler<FormInput> = (data: FormInput) => {
    alert('idk');
  };

  return (
    <>
      <Container maxW="container.sm" py="10px">
        <Heading as="h1" mb="4">
          Create listing
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <SimpleGrid columns={{ base: 2, sm: 1 }} columnGap={2} rowGap={2}>
            <GridItem colSpan={2}>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input {...register('title')} />
              </FormControl>
            </GridItem>

            <GridItem colSpan={2}>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea {...register('description')} size="sm" rounded="md" />
              </FormControl>
            </GridItem>

            <GridItem colSpan={2}>
              <FormControl>
                <FormLabel>Address</FormLabel>
                <Input {...register('address')} />
              </FormControl>
            </GridItem>

            <GridItem colSpan={2}>
              <FormControl>
                <FormLabel>Price</FormLabel>
                <Input {...register('price')} />
              </FormControl>
            </GridItem>

            <GridItem colSpan={1}>
              <FormControl>
                <FormLabel>Room count</FormLabel>
                <NumberInput min={1}>
                  <NumberInputField {...register('roomCount')} />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </GridItem>

            <GridItem colSpan={1}>
              <FormControl>
                <FormLabel>Area</FormLabel>
                <InputGroup>
                  <NumberInput max={50} min={1}>
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
              </FormControl>
            </GridItem>

            <GridItem colSpan={2}>
              <FormControl>
                <FormLabel>Image</FormLabel>
                <FileUpload
                  register={register('image')}
                  accept="image/*"
                ></FileUpload>
              </FormControl>
            </GridItem>

            <GridItem colSpan={2} mt="4">
              <Button type="submit" w="100%" colorScheme="green">
                Submit
              </Button>
            </GridItem>
          </SimpleGrid>
        </form>
      </Container>
    </>
  );
};

export default CreatingListing;
