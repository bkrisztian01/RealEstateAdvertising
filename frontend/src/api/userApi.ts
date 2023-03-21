import axios from 'axios';

const userApi = axios.create({
  baseURL: 'https://localhost:7202',
});

export type LoginProps = {
  userName: string;
  password: string;
};

export type SignUpProps = {
  userName: string;
  password: string;
  fullName: string;
  email: string;
};

export type Tokens = {
  accessToken: string;
  expiresIn: number;
  userName: string;
};

export const userLogin = async (cred: LoginProps): Promise<Tokens> => {
  const response = await userApi.post('/api/Account/login', cred);
  return response.data;
};

export const userSignUp = async (signUpData: SignUpProps) => {
  const response = await userApi.post('/api/Account/register', signUpData);
  return response.data;
};
