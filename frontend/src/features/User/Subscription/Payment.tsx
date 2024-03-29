import {
  Box,
  FormControl,
  FormErrorMessage,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
} from '@chakra-ui/react';
import { UseFormReturn } from 'react-hook-form';
import {
  BsFillCalendarEventFill,
  BsFillCreditCardFill,
  BsFillKeyFill,
} from 'react-icons/bs';
import InputMask from 'react-input-mask';
import * as yup from 'yup';

export type CreditCardInformation = {
  cardNumber: string;
  cvv: string;
  expirationDate: string;
};

export type PaymentProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<CreditCardInformation, any>;
};

export const paymentSchema = yup.object<CreditCardInformation>({
  cardNumber: yup
    .string()
    .label('Card number')
    .length(19, 'Invalid card number')
    .required(),
  cvv: yup.string().label('CVV').length(3).required(),
  expirationDate: yup
    .string()
    .label('Expiration date')
    .length(5, 'Not a valid date')
    .test(
      'Expiration date',
      () => 'Not a valid date',
      (value, testContext) => {
        if (!value) return false;

        const split = value.split('/');
        const month = parseInt(split[0]);
        const year = parseInt(`20${split[1]}`);
        if (!month || !year) return false;

        const currentYear = new Date().getUTCFullYear();
        const currentMonth = new Date().getMonth();
        return (
          year > currentYear || (year === currentYear && month >= currentMonth)
        );
      },
    )
    .required(),
});

export const Payment = ({ form }: PaymentProps) => {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <Stack>
      <FormControl isInvalid={!!errors.cardNumber}>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Icon as={BsFillCreditCardFill}></Icon>
          </InputLeftElement>
          <Input
            placeholder="Card number"
            {...register('cardNumber')}
            as={InputMask}
            mask={'9999 9999 9999 9999'}
            maskChar=""
          ></Input>
        </InputGroup>
        <FormErrorMessage>{errors.cardNumber?.message}</FormErrorMessage>
      </FormControl>

      <HStack alignItems="start">
        <Box w="100%">
          <FormControl isInvalid={!!errors.cvv}>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={BsFillKeyFill}></Icon>
              </InputLeftElement>
              <Input
                placeholder="CVV"
                as={InputMask}
                mask="999"
                maskChar=""
                type="password"
                {...register('cvv')}
              ></Input>
            </InputGroup>
            <FormErrorMessage>{errors.cvv?.message}</FormErrorMessage>
          </FormControl>
        </Box>

        <Box w="100%">
          <FormControl isInvalid={!!errors.expirationDate}>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={BsFillCalendarEventFill}></Icon>
              </InputLeftElement>
              <Input
                placeholder="Exp. date (mm/yy)"
                as={InputMask}
                mask="99/99"
                maskChar=""
                {...register('expirationDate')}
              ></Input>
            </InputGroup>
            <FormErrorMessage>
              {errors.expirationDate?.message}
            </FormErrorMessage>
          </FormControl>
        </Box>
      </HStack>
    </Stack>
  );
};
