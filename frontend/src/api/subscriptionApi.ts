import axios from 'axios';

const subscriptionApi = axios.create({
  baseURL: 'https://localhost:7202',
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
