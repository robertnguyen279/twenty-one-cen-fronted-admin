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

export enum Role {
  user = 'user',
  superviser = 'superviser',
  admin = 'admin',
}
export interface User {
  _id: ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  key: string;
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

export interface Category {
  _id: ObjectId;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export enum Size {
  XS = 'XS',
  S = 'S',
  M = 'M',
  L = 'L',
  XL = 'XL',
}

export type Picure = {
  pictureUrl: string;
  description: string;
};

export interface SizeColorQuantity {
  _id: ObjectId;
  size: Size;
  color: string;
  quantity: number;
}

export interface Product {
  _id: ObjectId;
  name: string;
  noToneName: string;
  description: string;
  urlString: string;
  discount: number;
  pictures: Array<Picure>;
  price: number;
  sold: number;
  category: {
    _id: ObjectId;
    name: string;
  };
  available: Array<SizeColorQuantity>;
  createdAt: Date;
  updatedAt: Date;
}
