import axios from 'axios';
import { Ad } from '../model/Ad';

const adsApi = axios.create({
  baseURL: 'https://localhost:7202',
});

export const getAds = async () => {
  const response = await adsApi.get<Ad[]>('/api/ad');
  return response.data;
};

export const getAdById = async (id: number) => {
  const response = await adsApi.get<Ad>(`/api/ad/${id}`);
  return response.data;
};
