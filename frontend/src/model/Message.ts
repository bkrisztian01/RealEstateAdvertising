import { User } from './User';

export type Message = {
  id: number;
  isUnread: boolean;
  content: string;
  fromUser: User;
  toUser: User;
  date: Date;
};
