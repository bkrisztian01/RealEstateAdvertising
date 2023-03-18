import axios from 'axios';

const userApi = axios.create({
  baseURL: 'https://localhost:7202',
});

export type LoginProps = {
  userName: string;
  password: string;
};

export type Tokens = {
  accessToken: string;
  expiresIn: number;
  userName: string;
};

export const userLogin = async (cred: LoginProps): Promise<Tokens> => {
  const response = await userApi.post('/api/Account/login', cred);
  console.log('login');
  return response.data;
};
