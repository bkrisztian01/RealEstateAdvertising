import axios from 'axios';

const subscriptionApi = axios.create({
  baseURL: 'https://localhost:7202',
});

export const getAllTiers = async () => {
  const response = await subscriptionApi.get('/api/Subscription/tiers');

  return response.data;
};
