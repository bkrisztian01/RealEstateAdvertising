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
import { AxiosError } from 'axios';
import { useAuthUser, useSignIn } from 'react-auth-kit';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import * as yup from 'yup';
import { LoginProps, Tokens, userLogin } from '../api/userApi';

type IFormInput = {
  userName: string;
  password: string;
};

const style = {
  '.chakra-form-control': {
    marginTop: 3,
  },
  '.chakra-form-control:first-child': {
    marginTop: 0,
  },
};

const registerSchema = yup.object<IFormInput>({
  userName: yup.string().required(),
  password: yup.string().required(),
});

type PropsType = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};
const LoginModal = ({ isOpen, onOpen, onClose }: PropsType) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(registerSchema),
  });
  const signIn = useSignIn();

  const auth = useAuthUser();
  const { mutate, isLoading, isError, error } = useMutation<
    Tokens,
    AxiosError,
    LoginProps
  >({
    mutationFn: (variables) => {
      return userLogin(variables).then((tokens) => {
        signIn({
          token: tokens.accessToken,
          expiresIn: tokens.expiresIn,
          tokenType: 'Bearer',
          authState: { userName: tokens.userName },
        });

        onClose();

        const asd = auth();
        console.log(asd);

        return tokens;
      });
    },
  });
  const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
    mutate(data);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Login</ModalHeader>
          <ModalCloseButton />
          <ModalBody sx={style}>
            <FormControl isInvalid={!!errors.userName}>
              <FormLabel>Username</FormLabel>
              <Input {...register('userName')} />
              <FormErrorMessage>{errors.userName?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.password}>
              <FormLabel>Password</FormLabel>
              <Input {...register('password')} type="password" />
              <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={isError}>
              <FormErrorMessage>{error?.message}</FormErrorMessage>
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
export default LoginModal;
