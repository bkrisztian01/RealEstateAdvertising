import axios from 'axios';
import { Ad } from '../model/Ad';

const adsApi = axios.create({
  baseURL: 'https://localhost:7202',
});

export type AdProps = {
  title: string;
  description: string;
  address: string;
  price: number;
  roomCount: number;
  area: number;
  image: string;
  createdAt: Date;
};

export const getAds = async (userName: string | null = null) => {
  const route = '/api/ad' + (userName ? `?userName=${userName}` : '');
  const response = await adsApi.get<Ad[]>(route);
  return response.data;
};

export const getAdById = async (id: number) => {
  const response = await adsApi.get<Ad>(`/api/ad/${id}`);
  return response.data;
};

export const createAd = async (data: AdProps, accessToken: string) => {
  const response = await adsApi.post<Ad>('/api/ad', data, {
    withCredentials: true,
    headers: {
      Authorization: accessToken,
    },
  });
  return response.data;
};

export const updateAd = async (
  id: number,
  data: AdProps,
  accessToken: string,
) => {
  const response = await adsApi.put<Ad>(`/api/ad/${id}`, data, {
    withCredentials: true,
    headers: {
      Authorization: accessToken,
    },
  });
  return response.data;
};
