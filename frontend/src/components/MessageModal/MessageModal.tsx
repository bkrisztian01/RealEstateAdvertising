import {
  Button,
  FormControl,
  FormErrorMessage,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

const messageSchema = yup.object<MessageFormInput>({
  content: yup.string().label('Message').required('Message is required.'),
});

export type MessageFormInput = {
  content: string;
};

export type MessageModalProps = {
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  onSubmit: SubmitHandler<MessageFormInput>;
};

export const MessageModal = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
}: MessageModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MessageFormInput>({
    resolver: yupResolver(messageSchema),
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent
        as="form"
        onSubmit={handleSubmit((data) => {
          onSubmit(data);
          reset();
        })}
      >
        <ModalHeader>Send a message</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isInvalid={!!errors.content}>
            <Textarea {...register('content')} />
            <FormErrorMessage>{errors.content?.message}</FormErrorMessage>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            type="submit"
            colorScheme="green"
            mr={3}
            isLoading={isLoading}
          >
            Send
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
