import { ReactNode } from 'react';

export type PageButtonsProps = {
  children: ReactNode;
  onPreviousClick: () => void;
  onNextClick: () => void;
  prevDisabled: boolean;
  nextDisabled: boolean;
};
