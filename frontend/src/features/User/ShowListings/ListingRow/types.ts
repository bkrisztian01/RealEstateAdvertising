import { Ad } from '../../../../model/Ad';

export type ListingRowProps = {
  ad: Ad;
  onDeleteButtonClick: () => void;
};
