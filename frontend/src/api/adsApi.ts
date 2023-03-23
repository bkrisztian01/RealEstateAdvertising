import axios from 'axios';
import { Ad } from '../model/Ad';

const adsApi = axios.create({
  baseURL: 'https://localhost:7202',
});

export type CreateAdProps = {
  title: string;
  description: string;
  address: string;
  price: number;
  roomCount: number;
  area: number;
  image: string;
};

export const getAds = async () => {
  const response = await adsApi.get<Ad[]>('/api/ad');
  return response.data;
};

export const getAdById = async (id: number) => {
  const response = await adsApi.get<Ad>(`/api/ad/${id}`);
  return response.data;
};

export const createAd = async (data: CreateAdProps, accessToken: string) => {
  const response = await adsApi.post<Ad>('/api/ad/create', data, {
    withCredentials: true,
    headers: {
      Authorization: accessToken,
    },
  });
  return response.data;
};
