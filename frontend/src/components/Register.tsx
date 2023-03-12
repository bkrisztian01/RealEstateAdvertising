import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
type IFormInput = {
  userName: string;
  password: string;
  fullName: string;
  email: string;
  phoneNumber: string;
};

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const registerSchema = yup.object<IFormInput>({
  userName: yup.string().required(),
  password: yup.string().required(),
  fullName: yup.string().required(),
  email: yup.string().email().required(),
  phoneNumber: yup.string().test(
    'phoneNumber',
    () => 'Phone number is not valid.',
    (value, testContext) => !value || phoneRegExp.test(value),
  ),
});

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(registerSchema),
  });
  const onSubmit: SubmitHandler<IFormInput> = (data: IFormInput) => {
    alert(JSON.stringify(data));
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors.userName}>
          <FormLabel>Username</FormLabel>
          <Input {...register('userName')} />
          <FormErrorMessage>{errors.userName?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.email}>
          <FormLabel>Email address</FormLabel>
          <Input {...register('email')} />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.password}>
          <FormLabel>Password</FormLabel>
          <Input {...register('password')} type="password" />
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.phoneNumber}>
          <FormLabel>Phone number</FormLabel>
          <Input {...register('phoneNumber')} />
          <FormErrorMessage>{errors.phoneNumber?.message}</FormErrorMessage>
        </FormControl>

        <Button type="submit" colorScheme="green" mt="2">
          Submit
        </Button>
      </form>
    </>
  );
};
export default Register;
