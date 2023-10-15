import { Select, Skeleton } from '@chakra-ui/react';
import { getAllTiers } from 'api/subscriptionApi';
import { AxiosError } from 'axios';
import { SubscriptionTier } from 'model/SubscriptionTier';
import { useQuery } from 'react-query';

type TierSelectionProps = {
  onTierChange: (tierId: number | null) => void;
  tier: string;
};

export const TierSelection = ({ onTierChange, tier }: TierSelectionProps) => {
  const { isLoading, data } = useQuery<SubscriptionTier[], AxiosError>({
    queryKey: ['tiers'],
    queryFn: getAllTiers,
  });

  const onSelectionChanged = (value: string) => {
    onTierChange(value ? parseInt(value) : null);
  };

  return (
    <Skeleton height="60px" isLoaded={!isLoading}>
      <Select
        placeholder="Select tier"
        value={tier}
        onChange={(e) => onSelectionChanged(e.target.value)}
      >
        {data?.map((tier) => {
          return (
            <option key={tier.id} value={tier.id.toString()}>
              {tier.name}
            </option>
          );
        })}
      </Select>
    </Skeleton>
  );
};
