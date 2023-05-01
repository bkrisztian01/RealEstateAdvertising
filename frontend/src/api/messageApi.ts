import axios from 'axios';
import { Message } from 'model/Message';
import { User } from 'model/User';
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

export type MessagesDTO = {
  messages: Message[];
  user: User;
};

export async function getMessagesWith(
  accessToken: string,
  withUserName: string,
) {
  const response = await messageApi.get<MessagesDTO>(
    `/api/Message/${withUserName}`,
    {
      headers: {
        Authorization: accessToken,
      },
    },
  );
  return response.data;
}
