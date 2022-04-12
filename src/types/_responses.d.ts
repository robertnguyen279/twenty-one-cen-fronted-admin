import { ObjectId } from 'mongodb';

export type UserContactDetail = {
  _id: ObjectId;
  province: string;
  district: string;
  addressDetail: string;
  phone: number;
  firstName: string;
  lastName: string;
};

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  avatarUrl?: string;
  role: Role;
  phone: number;
  birthday?: Date;
  refreshToken: string;
  contactDetails?: Array<UserContactDetail>;
  createdAt?: Date;
  updatedAt?: Date;
}
