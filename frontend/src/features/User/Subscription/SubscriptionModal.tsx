import {
  Box,
  Button,
  Container,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  Stepper,
  StepSeparator,
  StepStatus,
  StepTitle,
  useSteps,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { CreditCardInformation, Payment, paymentSchema } from './Payment';
import { TierSelection } from './TierSelection';
import { SubscriptionModalProps } from './types';

const steps = [
  { title: 'Tiers', description: 'Select your tier' },
  { title: 'Payment', description: 'Enter payment method' },
  { title: 'Overview', description: 'Check your details' },
];

const tierSelectionSchema = yup.object<{ tierId: number }>({
  tierId: yup.string().required('You must select a tier.'),
});

export const SubscriptionModal = ({
  isOpen,
  onClose,
}: SubscriptionModalProps) => {
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });

  const [tierId, setTierId] = useState<number | null>(null);

  const paymentForm = useForm<CreditCardInformation>({
    resolver: yupResolver(paymentSchema),
  });

  const onPrimaryButtonClicked = () => {
    switch (activeStep) {
      case 0:
        setActiveStep(1);
        break;
      case 1:
        paymentForm.handleSubmit((value) => {
          setActiveStep(2);
        })();
        break;
      case 2:
        break;
    }
  };
  let activeComponent;
  let disablePrimaryButton = false;
  switch (activeStep) {
    case 0:
      activeComponent = (
        <TierSelection
          onTierChange={setTierId}
          tier={tierId ? tierId.toString() : ''}
        ></TierSelection>
      );
      disablePrimaryButton = tierId === null;
      break;
    case 1:
      activeComponent = <Payment form={paymentForm}></Payment>;
      disablePrimaryButton = tierId === null;
      break;
    case 2:
      break;
  }

  let backButton;
  if (activeStep > 0) {
    backButton = (
      <Button mr="3" onClick={() => setActiveStep((s) => s - 1)}>
        Back
      </Button>
    );
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="2xl"
      lockFocusAcrossFrames={false}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Buy a new subscription!</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stepper index={activeStep} colorScheme="green">
            {steps.map((step, index) => (
              <Step key={index}>
                <StepIndicator>
                  <StepStatus
                    complete={<StepIcon />}
                    incomplete={<StepNumber />}
                    active={<StepNumber />}
                  />
                </StepIndicator>

                <Box flexShrink="0">
                  <StepTitle>{step.title}</StepTitle>
                  <StepDescription>{step.description}</StepDescription>
                </Box>

                <StepSeparator />
              </Step>
            ))}
          </Stepper>
          <Container mx="0" marginTop="20px" maxW="100%">
            {activeComponent}
          </Container>
        </ModalBody>
        <ModalFooter>
          {backButton}
          <Button
            colorScheme="green"
            isDisabled={disablePrimaryButton}
            onClick={onPrimaryButtonClicked}
          >
            Next
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
