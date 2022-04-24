import axios from 'services/axios.service';

export const getOrders = (): Promise<any> => axios.get(`/voucher`);
