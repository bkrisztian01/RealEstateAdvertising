import { Box, Grid, GridItem } from '@chakra-ui/react';
import { SubscriptionTier } from 'model/SubscriptionTier';
import { formatPrice } from 'util/formatPrice';
import { CreditCardInformation } from './Payment';

export type OverviewProps = {
  creditCard: CreditCardInformation;
  tier: SubscriptionTier;
};

export const Overview = ({ creditCard, tier }: OverviewProps) => {
  const cardNumberText = 'Ends in ' + creditCard.cardNumber.split(' ').at(-1);

  return (
    <>
      <Grid
        templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
        gap="5px"
      >
        <GridItem>
          <Box fontWeight="semibold">Tier</Box>
          <Box>{tier.name}</Box>
        </GridItem>
        <GridItem>
          <Box fontWeight="semibold">Number of highlighted ads</Box>
          <Box>{tier.maxHighlightedAds}</Box>
        </GridItem>
        <GridItem>
          <Box fontWeight="semibold">Payment method</Box>
          <Box>{cardNumberText}</Box>
        </GridItem>
        <GridItem>
          <Box fontWeight="semibold">Price</Box>
          <Box>{formatPrice(tier.price)}</Box>
        </GridItem>
      </Grid>
    </>
  );
};
