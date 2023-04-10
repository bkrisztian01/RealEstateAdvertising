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
  useDisclosure,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import * as yup from 'yup';
import { SignUpProps, userSignUp } from '../../../api/userApi';
import SuccessfulModal from '../../../components/Modals/SuccessfulModal';
import './styles.css';
import { RegisterFormInput, RegisterModalProps } from './types';

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const registerSchema = yup.object<RegisterFormInput>({
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

export const RegisterModal = ({ isOpen, onClose }: RegisterModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInput>({
    resolver: yupResolver(registerSchema),
  });

  const {
    isOpen: successIsOpen,
    onOpen: successOnOpen,
    onClose: successOnClose,
  } = useDisclosure();

  const { mutate, isLoading, isError, error } = useMutation<
    unknown,
    AxiosError,
    SignUpProps
  >({
    mutationFn: (data) => {
      return userSignUp(data);
    },
    onSuccess: () => {
      onClose();
      successOnOpen();
    },
  });

  const onSubmit: SubmitHandler<RegisterFormInput> = (
    data: RegisterFormInput,
  ) => {
    mutate(data);
  };

  return (
    <>
      <SuccessfulModal
        isOpen={successIsOpen}
        onClose={successOnClose}
        text="You signed up!"
      />

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl variant="floating" isInvalid={!!errors.userName}>
              <Input placeholder=" " {...register('userName')} />
              <FormLabel>Username</FormLabel>
              <FormErrorMessage>{errors.userName?.message}</FormErrorMessage>
            </FormControl>

            <FormControl variant="floating" isInvalid={!!errors.email}>
              <Input placeholder=" " {...register('email')} />
              <FormLabel>Email address</FormLabel>
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>

            <FormControl variant="floating" isInvalid={!!errors.fullName}>
              <Input placeholder=" " {...register('fullName')} />
              <FormLabel>Name</FormLabel>
              <FormErrorMessage>{errors.fullName?.message}</FormErrorMessage>
            </FormControl>

            <FormControl variant="floating" isInvalid={!!errors.password}>
              <Input
                placeholder=" "
                {...register('password')}
                type="password"
              />
              <FormLabel>Password</FormLabel>
              <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
            </FormControl>

            <FormControl variant="floating" isInvalid={!!errors.phoneNumber}>
              <Input placeholder=" " {...register('phoneNumber')} />
              <FormLabel>Phone number</FormLabel>
              <FormErrorMessage>{errors.phoneNumber?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={isError}>
              <FormErrorMessage>{error?.message}</FormErrorMessage>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={handleSubmit(onSubmit)}
              isLoading={isLoading}
              colorScheme="green"
              mr="3"
            >
              Sign up
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
