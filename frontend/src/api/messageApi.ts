import axios from 'axios';
import { Message } from 'model/Message';
import { MessageContactList } from 'model/MessageContactList';
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

export async function getMessageContactList(
  accessToken: string,
  pageNumber = 1,
) {
  const response = await messageApi.get<MessageContactList>('/api/Message', {
    withCredentials: true,
    headers: {
      Authorization: accessToken,
    },
    params: {
      pageIndex: pageNumber,
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
      withCredentials: true,
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
      withCredentials: true,
      headers: {
        Authorization: accessToken,
      },
    },
  );
  return response.data;
}
