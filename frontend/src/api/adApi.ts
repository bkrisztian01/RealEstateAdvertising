import axios from 'axios';
import { Ad } from 'model/Ad';
import { handleDates } from 'util/handleDates';

const adApi = axios.create({
  baseURL: 'https://localhost:7202',
});

adApi.interceptors.response.use((originalResponse) => {
  handleDates(originalResponse.data);
  return originalResponse;
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

export type GetAdsOptions = {
  userName?: string;
  pageIndex?: number;
  address?: string;
  minPrice?: number;
  maxPrice?: number;
  minArea?: number;
  maxArea?: number;
  minRoomCount?: number;
  maxRoomCount?: number;
};

export type AdList = {
  hasMore: boolean;
  ads: Ad[];
};

export const getAds = async (options?: GetAdsOptions) => {
  const response = await adApi.get<AdList>('/api/ad', {
    params: options,
  });
  return response.data;
};

export const getAdById = async (id: number) => {
  const response = await adApi.get<Ad>(`/api/ad/${id}`);
  return response.data;
};

export const createAd = async (data: AdProps, accessToken: string) => {
  const response = await adApi.post<Ad>('/api/ad', data, {
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
  const response = await adApi.put<Ad>(`/api/ad/${id}`, data, {
    withCredentials: true,
    headers: {
      Authorization: accessToken,
    },
  });
  return response.data;
};

export const deleteAd = async (id: number, accessToken: string) => {
  await adApi.delete(`/api/ad/${id}`, {
    withCredentials: true,
    headers: {
      Authorization: accessToken,
    },
  });
};

export const canHighlightAds = async (accessToken: string) => {
  const result = await adApi.get('api/ad/highlight', {
    withCredentials: true,
    headers: {
      Authorization: accessToken,
    },
  });

  return result.data;
};
