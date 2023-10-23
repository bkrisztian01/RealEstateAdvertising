import {
  FormControl,
  FormErrorMessage,
  Select,
  Skeleton,
} from '@chakra-ui/react';
import { getAllTiers } from 'api/subscriptionApi';
import { AxiosError } from 'axios';
import { SubscriptionTier } from 'model/SubscriptionTier';
import { UseFormReturn } from 'react-hook-form';
import { useQuery } from 'react-query';
import * as yup from 'yup';

type TierSelectionProps = {
  form: UseFormReturn<TierAdForm, any>;
};

export const tierSelectionSchema = yup.object<{ tierId: number }>({
  tierId: yup
    .number()
    .required('You must select a tier')
    .typeError('You must select a tier'),
});

export type TierAdForm = {
  tierId: number;
};

export const TierSelection = ({ form }: TierSelectionProps) => {
  const { isLoading, data } = useQuery<SubscriptionTier[], AxiosError>({
    queryKey: ['tiers'],
    queryFn: getAllTiers,
  });

  const {
    formState: { errors },
    register,
  } = form;

  return (
    <Skeleton height="60px" isLoaded={!isLoading}>
      <FormControl isInvalid={!!errors.tierId}>
        <Select
          placeholder="Select tier"
          {...register('tierId', { valueAsNumber: true })}
        >
          {data?.map((tier) => {
            return (
              <option key={tier.id} value={tier.id}>
                {tier.name}
              </option>
            );
          })}
        </Select>
        <FormErrorMessage>{errors.tierId?.message}</FormErrorMessage>
      </FormControl>
    </Skeleton>
  );
};
