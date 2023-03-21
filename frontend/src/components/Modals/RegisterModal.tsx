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
import { SignUpProps, userSignUp } from '../../api/userApi';
import SuccessfulModal from './SuccessfulModal';

type IFormInput = {
  userName: string;
  password: string;
  fullName: string;
  email: string;
  phoneNumber: string;
};

const style = {
  '.chakra-form-control': {
    marginTop: 3,
  },
  '.chakra-form-control:first-child': {
    marginTop: 0,
  },
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

type PropsType = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};
const RegisterModal = ({ isOpen, onOpen, onClose }: PropsType) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
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
  >((data) => {
    return userSignUp(data).then((responseData) => {
      onClose();
      successOnOpen();
    });
  });

  const onSubmit: SubmitHandler<IFormInput> = (data: IFormInput) => {
    mutate(data);
  };

  return (
    <>
      <SuccessfulModal
        isOpen={successIsOpen}
        onClose={successOnClose}
        onOpen={successOnOpen}
        text="You signed up!"
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody sx={style}>
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

            <FormControl isInvalid={!!errors.fullName}>
              <FormLabel>Full name</FormLabel>
              <Input {...register('fullName')} />
              <FormErrorMessage>{errors.fullName?.message}</FormErrorMessage>
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
export default RegisterModal;
