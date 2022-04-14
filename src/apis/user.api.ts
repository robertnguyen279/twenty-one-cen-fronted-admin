import axios from 'services/axios.service';
import { LoginUser } from 'types';

export const getUser = (): Promise<any> => axios.get(`/user`);
export const getUsers = (): Promise<any> => axios.get(`/user/findUsers?limit=9999`);
export const deleteUser = (id: string): Promise<any> => axios.delete(`/user/${id}`);
export const loginUser = ({ emailOrPhone, password }: LoginUser): Promise<any> =>
  axios.post('/user/login', { emailOrPhone, password });
