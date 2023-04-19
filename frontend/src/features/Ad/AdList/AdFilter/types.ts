import { SubmitHandler } from 'react-hook-form';

export type AdFilterFormInput = {
  address: string;
  minPrice: number;
  maxPrice: number;
  minArea: number;
  maxArea: number;
  minRoomCount: number;
  maxRoomCount: number;
};

export type AdFilterFormProps = {
  onSubmit: SubmitHandler<AdFilterFormInput>;
};
