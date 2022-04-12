import axios from 'services/axios.service';
import { LoginUser } from 'types';

export const getUser = (): Promise<any> => axios.get(`/user`);

export const loginUser = ({ emailOrPhone, password }: LoginUser): Promise<any> =>
  axios.post('/user/login', { emailOrPhone, password });
