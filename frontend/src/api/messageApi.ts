import axios from 'axios';
import { Message } from 'model/Message';
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

export async function sendMessage(
  accessToken: string,
  toUserName: string,
  content: string,
) {
  const response = await messageApi.post(
    `/api/Message/${toUserName}`,
    { content },
    {
      headers: {
        Authorization: accessToken,
      },
    },
  );
  return response.data;
}

export async function getMessagesWith(
  accessToken: string,
  withUserName: string,
) {
  const response = await messageApi.get<Message[]>(
    `/api/Message/${withUserName}`,
    {
      headers: {
        Authorization: accessToken,
      },
    },
  );
  return response.data;
}
