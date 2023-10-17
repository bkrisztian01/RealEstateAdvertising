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
  Text,
  useSteps,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  getAllTiers,
  getUsersSubscription,
  subscribeToTier,
} from 'api/subscriptionApi';
import { AxiosError } from 'axios';
import { Subscription } from 'model/Subscription';
import { SubscriptionTier } from 'model/SubscriptionTier';
import { useAuthHeader } from 'react-auth-kit';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { formatPrice } from 'util/formatPrice';
import { Overview } from './Overview';
import { CreditCardInformation, Payment, paymentSchema } from './Payment';
import {
  TierAdForm,
  TierSelection,
  tierSelectionSchema,
} from './TierSelection';
import { SubscriptionModalProps } from './types';

const steps = [
  { title: 'Tiers', description: 'Select your tier' },
  { title: 'Payment', description: 'Enter payment method' },
  { title: 'Overview', description: 'Check your details' },
];

export const SubscriptionModal = ({
  isOpen,
  onClose,
  onSubscriptionSuccess,
}: SubscriptionModalProps) => {
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });

  const authHeader = useAuthHeader();

  const { data } = useQuery<SubscriptionTier[], AxiosError>({
    queryKey: ['tiers'],
    queryFn: getAllTiers,
  });

  const { data: subscription } = useQuery<Subscription | null, AxiosError>({
    queryKey: ['subsription'],
    queryFn: () => getUsersSubscription(authHeader()),
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: () =>
      subscribeToTier(tierSelectionForm.getValues().tierId, authHeader()),
    onSuccess: () => {
      onSubscriptionSuccess();
      resetModal();
    },
  });

  const tierSelectionForm = useForm<TierAdForm>({
    resolver: yupResolver(tierSelectionSchema),
  });
  const paymentForm = useForm<CreditCardInformation>({
    resolver: yupResolver(paymentSchema),
  });

  const onPrimaryButtonClicked = async () => {
    switch (activeStep) {
      case 0:
        tierSelectionForm.handleSubmit(() => {
          setActiveStep(1);
          console.log(tierSelectionForm.getValues());
        })();
        break;
      case 1:
        paymentForm.handleSubmit(() => {
          setActiveStep(2);
          console.log(paymentForm.getValues());
        })();
        break;
      case 2:
        mutate();
        break;
    }
  };

  const resetModal = () => {
    tierSelectionForm.reset();
    paymentForm.reset();
    setActiveStep(0);
  };

  let activeComponent;
  const disablePrimaryButton = false;
  switch (activeStep) {
    case 0:
      activeComponent = (
        <TierSelection form={tierSelectionForm}></TierSelection>
      );
      break;
    case 1:
      activeComponent = <Payment form={paymentForm}></Payment>;
      break;
    case 2:
      activeComponent = (
        <Overview
          tier={data?.find(
            (t) => t.id === tierSelectionForm.getValues().tierId,
          )}
          creditCard={paymentForm.getValues()}
        ></Overview>
      );
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

  const subInfoStyle = {
    display: 'flex',
    justifyContent: 'space-between',
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        resetModal();
      }}
      size={subscription ? 'lg' : '2xl'}
      lockFocusAcrossFrames={false}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {subscription ? 'Your subscription' : 'Buy a new subscription!'}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {subscription ? (
            <>
              <Box {...subInfoStyle}>
                <Text fontWeight="semibold">{subscription.tier.name}</Text>
                <Text fontWeight="semibold">
                  {formatPrice(subscription.tier.price)} per month
                </Text>
              </Box>
              <Box {...subInfoStyle} color="gray">
                <Text>
                  Valid until: {subscription.validUntil.toLocaleDateString()}
                </Text>
                <Text>
                  Number of highlighted ads:{' '}
                  {subscription.tier.maxHighlightedAds}
                </Text>
              </Box>
              <Box mt="20px">
                <Text>
                  You can change tiers when your subscription runs out.
                </Text>
              </Box>
            </>
          ) : (
            <>
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
            </>
          )}
        </ModalBody>
        <ModalFooter>
          {subscription ? (
            <Button onClick={onClose}>Close</Button>
          ) : (
            <>
              {backButton}
              <Button
                colorScheme="green"
                isDisabled={disablePrimaryButton}
                onClick={onPrimaryButtonClicked}
                isLoading={isLoading}
              >
                {activeStep === 2 ? 'Subscribe' : 'Next'}
              </Button>
            </>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
