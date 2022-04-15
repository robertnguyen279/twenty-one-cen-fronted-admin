import axios from 'services/axios.service';
import { LoginUser, CreateUserByAdmin } from 'types';

export const getUser = (): Promise<any> => axios.get(`/user`);
export const getUsers = (): Promise<any> => axios.get(`/user/findUsers?limit=9999`);
export const deleteUser = (id: string): Promise<any> => axios.delete(`/user/${id}`);
export const deleteUserByAdmin = (id: string): Promise<any> => axios.delete(`/user/admin/${id}`);
export const loginUser = ({ emailOrPhone, password }: LoginUser): Promise<any> =>
  axios.post('/user/login', { emailOrPhone, password });

export const createUserByAdmin = ({ email, firstName, lastName, role, password }: CreateUserByAdmin): Promise<any> =>
  axios.post('/user/createByAdmin', { email, firstName, lastName, role, password });
