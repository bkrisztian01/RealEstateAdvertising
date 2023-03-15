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
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

type IFormInput = {
  userName: string;
  password: string;
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
  const onSubmit: SubmitHandler<IFormInput> = (data: IFormInput) => {
    alert(JSON.stringify(data));
  };

  const style = {
    '.chakra-form-control': {
      marginTop: 3,
    },
    '.chakra-form-control:first-child': {
      marginTop: 0,
    },
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
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleSubmit(onSubmit)} colorScheme="green" mr="3">
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
