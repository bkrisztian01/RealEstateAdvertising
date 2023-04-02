export type Ad = {
  id: number;
  title: string;
  description: string;
  address: string;
  price: number;
  roomCount: number;
  area: number;
  createdAt: Date;
  owner: {
    fullName: string;
    userName: string;
    email: string;
  };
  image: string; // Base64
};
