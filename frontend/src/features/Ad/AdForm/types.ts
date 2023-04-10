import { MutationFunction } from 'react-query';
import { Ad } from '../../../model/Ad';

export type AdFormProps = {
  mutationFn: MutationFunction<Ad, AdFormInput>;
  ad?: Ad;
};

export type AdFormInput = {
  title: string;
  description: string;
  address: string;
  price: number;
  roomCount: number;
  area: number;
  image: FileList;
};
