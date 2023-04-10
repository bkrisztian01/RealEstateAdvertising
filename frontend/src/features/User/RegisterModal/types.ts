export type RegisterFormInput = {
  userName: string;
  password: string;
  fullName: string;
  email: string;
  phoneNumber: string;
};

export type RegisterModalProps = {
  isOpen: boolean;
  onClose: () => void;
};
