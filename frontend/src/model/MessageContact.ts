import { User } from './User';

export type MessageContact = {
  user: User;
  lastMessageDate: Date;
  unreadCount: number;
};
