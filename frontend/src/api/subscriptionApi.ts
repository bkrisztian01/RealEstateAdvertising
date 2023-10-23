import axios from 'axios';
import { handleDates } from 'util/handleDates';

const subscriptionApi = axios.create({
  baseURL: 'https://localhost:7202',
});

subscriptionApi.interceptors.response.use((originalResponse) => {
  handleDates(originalResponse.data);
  return originalResponse;
});

export const getAllTiers = async () => {
  const response = await subscriptionApi.get('/api/Subscription/tiers');

  return response.data;
};

export const subscribeToTier = async (tierId: number, accessToken: string) => {
  await subscriptionApi.post(
    '/api/Subscription/subscribe',
    { tierId: tierId },
    {
      withCredentials: true,
      headers: {
        Authorization: accessToken,
      },
    },
  );
};

export const getUsersSubscription = async (accessToken: string) => {
  const response = await subscriptionApi.get('/api/Subscription', {
    withCredentials: true,
    headers: {
      Authorization: accessToken,
    },
  });

  return response.data;
};
