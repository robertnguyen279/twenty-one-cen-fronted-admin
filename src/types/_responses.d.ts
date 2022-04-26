import { ObjectId } from 'mongodb';

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

export enum OrderStatus {
  placed = 'placed',
  approved = 'approved',
  done = 'done',
  cancelled = 'cancelled',
}

export type OrderProduct = {
  productId: {
    name: string;
    price: number;
    pictures: Array<string>;
  };
  item: ObjectId;
  quantity: number;
};

export type UserContactDetail = {
  _id: ObjectId;
  province: string;
  district: string;
  addressDetail: string;
  phone: number;
  firstName: string;
  lastName: string;
};

export interface Order {
  _id: ObjectId;
  products: Array<OrderProduct>;
  contactDetail: UserContactDetail;
  vouchers?: Array<{ code: string; expiresIn: Date; description: string }>;
  orderDate: Date;
  shipDate?: Date;
  totalPrice: number;
  originalPrice: number;
  description?: string;
  user?: ObjectId;
  status: OrderStatus;
  updatedAt: Date;
  createdAt: Date;
}

export interface Voucher {
  _id: ObjectId;
  code: string;
  description: string;
  discount: number;
  category?: ObjectId;
  expiresIn: Date;
  public: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Blog {
  _id: ObjectId;
  title: string;
  urlString: string;
  postBy: User;
  picture: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Carousel {
  _id: ObjectId;
  picture: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SiteInfo {
  phone: number;
  zalo: number;
  facebook: string;
  email: string;
}
