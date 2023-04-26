import axios from 'axios';
import { handleDates } from 'util/handleDates';

const messageApi = axios.create({
  baseURL: 'https://localhost:7202',
});

messageApi.interceptors.response.use((originalResponse) => {
  handleDates(originalResponse.data);
  return originalResponse;
});

export async function getNewMessageCount(accessToken: string) {
  const response = await messageApi.get('/api/Message/newCount', {
    withCredentials: true,
    headers: {
      Authorization: accessToken,
    },
  });
  return response.data;
}

export async function getMessageContactList(accessToken: string) {
  const response = await messageApi.get('/api/Message', {
    withCredentials: true,
    headers: {
      Authorization: accessToken,
    },
  });
  return response.data;
}
