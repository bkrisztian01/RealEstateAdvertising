import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginProps, Tokens, userLogin } from 'api/userApi';
import { AxiosError } from 'axios';
import { useSignIn } from 'react-auth-kit';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import * as yup from 'yup';
import './style.css';
import { LoginFormInput, LoginModalProps } from './types';

const loginSchema = yup.object<LoginFormInput>({
  userName: yup.string().required(),
  password: yup.string().required(),
});

export const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInput>({
    resolver: yupResolver(loginSchema),
  });

  const signIn = useSignIn();

  const { mutate, isLoading, isError, error } = useMutation<
    Tokens,
    AxiosError,
    LoginProps
  >({
    mutationFn: (variables) => {
      return userLogin(variables);
    },
    onSuccess: (tokens) => {
      signIn({
        token: tokens.accessToken,
        expiresIn: tokens.expiresIn,
        tokenType: 'Bearer',
        authState: { userName: tokens.userName },
      });

      onClose();
    },
  });

  const onSubmit: SubmitHandler<LoginFormInput> = async (
    data: LoginFormInput,
  ) => {
    mutate(data);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Login</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl
              className="login-form-control"
              variant="floating"
              isInvalid={!!errors.userName}
            >
              <Input placeholder=" " {...register('userName')} />
              <FormLabel>Username</FormLabel>
              <FormErrorMessage>{errors.userName?.message}</FormErrorMessage>
            </FormControl>

            <FormControl
              className="login-form-control"
              variant="floating"
              isInvalid={!!errors.password}
            >
              <Input
                placeholder=" "
                {...register('password')}
                type="password"
              />
              <FormLabel>Password</FormLabel>
              <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={isError}>
              <FormErrorMessage>
                {error?.code === '401'
                  ? 'Wrong username or password.'
                  : error?.message}
              </FormErrorMessage>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              isLoading={isLoading}
              onClick={handleSubmit(onSubmit)}
              colorScheme="green"
              mr="3"
            >
              Login
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
