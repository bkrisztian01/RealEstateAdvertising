import { SubscriptionTier } from './SubscriptionTier';
import { User } from './User';

export type Subscription = {
  user: User;
  tier: SubscriptionTier;
  validUntil: Date;
};
