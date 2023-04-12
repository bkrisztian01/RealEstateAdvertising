import { ReactNode } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

export type FileUploadProps = {
  register: UseFormRegisterReturn;
  accept?: string;
  multiple?: boolean;
  children?: ReactNode;
};
