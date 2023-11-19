import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Grid,
  GridItem,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuList,
  NumberInput,
  NumberInputField,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { AiOutlineSearch } from 'react-icons/ai';
import { BiChevronDown, BiMinus } from 'react-icons/bi';
import * as yup from 'yup';
import { AdFilterFormInput, AdFilterProps } from './types';

const adFilterSchema = yup.object<AdFilterFormInput>({
  address: yup.string().nullable(),
  minPrice: yup
    .number()
    .label('Minimum price')
    .positive()
    .integer()
    .optional()
    .transform((_, val) => (Number(val) ? Number(val) : undefined)),
  maxPrice: yup
    .number()
    .label('Maximum price')
    .positive()
    .integer()
    .optional()
    .transform((_, val) => (Number(val) ? Number(val) : undefined)),
  minArea: yup
    .number()
    .label('Minimum area')
    .positive()
    .integer()
    .optional()
    .transform((_, val) => (Number(val) ? Number(val) : undefined)),
  maxArea: yup
    .number()
    .label('Maximum area')
    .positive()
    .integer()
    .optional()
    .transform((_, val) => (Number(val) ? Number(val) : undefined)),
  minRoomCount: yup
    .number()
    .label('Minimum room count')
    .positive()
    .integer()
    .optional()
    .transform((_, val) => (Number(val) ? Number(val) : undefined)),
  maxRoomCount: yup
    .number()
    .label('Maximum room count')
    .positive()
    .integer()
    .optional()
    .transform((_, val) => (Number(val) ? Number(val) : undefined)),
});

export const AdFilter = ({ onSubmit }: AdFilterProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AdFilterFormInput>({
    resolver: yupResolver(adFilterSchema),
    mode: 'onChange',
  });

  const watchFilters = watch();

  const colorScheme = (keys: (keyof AdFilterFormInput)[]): string => {
    if (keys.some((key, _) => key in errors)) {
      return 'red';
    } else if (keys.some((key, _) => watchFilters[key])) {
      return 'green';
    }
    return 'gray';
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={!!errors.address}>
        <FormErrorMessage>{errors.address?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.minPrice}>
        <FormErrorMessage>{errors.minPrice?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.maxPrice}>
        <FormErrorMessage>{errors.maxPrice?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.minArea}>
        <FormErrorMessage>{errors.minArea?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.maxArea}>
        <FormErrorMessage>{errors.maxArea?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.minRoomCount}>
        <FormErrorMessage>{errors.minRoomCount?.message}</FormErrorMessage>
      </FormControl>
      <FormControl mb={errors ? '10px' : ''} isInvalid={!!errors.maxRoomCount}>
        <FormErrorMessage>{errors.maxRoomCount?.message}</FormErrorMessage>
      </FormControl>
      <Grid
        templateColumns={{ md: 'repeat(2, 1fr)', sm: '1fr' }}
        templateRows={{ base: 'repeat(2, 1fr)' }}
      >
        <GridItem colSpan={{ base: 1, md: 2 }}>
          <InputGroup>
            <InputLeftElement>
              <Icon as={AiOutlineSearch} />
            </InputLeftElement>
            <Input {...register('address')} placeholder="Search address" />
          </InputGroup>
        </GridItem>

        <GridItem colSpan={1} mb="10px">
          <HStack>
            <Box>
              <Menu closeOnSelect={false}>
                <MenuButton
                  as={Button}
                  colorScheme={colorScheme(['minPrice', 'maxPrice'])}
                  rightIcon={<BiChevronDown />}
                >
                  Price
                </MenuButton>
                <MenuList p="10px">
                  <HStack>
                    <FormControl isInvalid={!!errors.minPrice}>
                      <NumberInput>
                        <NumberInputField
                          size={5}
                          {...register('minPrice')}
                          placeholder="Min"
                        />
                      </NumberInput>
                    </FormControl>
                    <BiMinus />
                    <FormControl isInvalid={!!errors.maxPrice}>
                      <NumberInput>
                        <NumberInputField
                          size={5}
                          {...register('maxPrice')}
                          placeholder="Max"
                        />
                      </NumberInput>
                    </FormControl>
                  </HStack>
                </MenuList>
              </Menu>
            </Box>

            <Box>
              <Menu closeOnSelect={false}>
                <MenuButton
                  as={Button}
                  colorScheme={colorScheme(['minArea', 'maxArea'])}
                  rightIcon={<BiChevronDown />}
                >
                  Area
                </MenuButton>
                <MenuList p="10px">
                  <HStack>
                    <FormControl isInvalid={!!errors.minArea}>
                      <NumberInput>
                        <NumberInputField
                          size={5}
                          {...register('minArea')}
                          placeholder="Min"
                        />
                      </NumberInput>
                    </FormControl>
                    <BiMinus />
                    <FormControl isInvalid={!!errors.maxArea}>
                      <NumberInput>
                        <NumberInputField
                          size={5}
                          {...register('maxArea')}
                          placeholder="Max"
                        />
                      </NumberInput>
                    </FormControl>
                  </HStack>
                </MenuList>
              </Menu>
            </Box>

            <Box>
              <Menu closeOnSelect={false}>
                <MenuButton
                  as={Button}
                  colorScheme={colorScheme(['minRoomCount', 'maxRoomCount'])}
                  rightIcon={<BiChevronDown />}
                >
                  Rooms
                </MenuButton>
                <MenuList p="10px">
                  <HStack>
                    <FormControl isInvalid={!!errors.minRoomCount}>
                      <NumberInput>
                        <NumberInputField
                          size={5}
                          {...register('minRoomCount')}
                          placeholder="Min"
                        />
                      </NumberInput>
                    </FormControl>
                    <BiMinus />
                    <FormControl isInvalid={!!errors.maxRoomCount}>
                      <NumberInput>
                        <NumberInputField
                          size={5}
                          {...register('maxRoomCount')}
                          placeholder="Max"
                        />
                      </NumberInput>
                    </FormControl>
                  </HStack>
                </MenuList>
              </Menu>
            </Box>
          </HStack>
        </GridItem>

        <GridItem
          colSpan={1}
          className="second-row"
          justifyContent="right"
          display="flex"
          mb="10px"
        >
          <Button
            type="submit"
            colorScheme="green"
            w={{ base: '100%', md: 'auto', lg: 'auto' }}
          >
            Search
          </Button>
          <input type="submit" hidden />
        </GridItem>
      </Grid>
    </form>
  );
};
