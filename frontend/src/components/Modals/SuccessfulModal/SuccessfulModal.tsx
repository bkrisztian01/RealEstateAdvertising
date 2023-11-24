import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { SuccessfulModalProps } from './types';

export const SuccessfulModal = ({
  isOpen,
  onClose,
  text,
  isCentered,
}: SuccessfulModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered={isCentered}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Succesful</ModalHeader>
        <ModalBody>
          <Text>{text}</Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="green" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
