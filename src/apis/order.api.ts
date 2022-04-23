import axios from 'services/axios.service';

export const getOrders = (): Promise<any> => axios.get(`/order?skip=0&limit=99999`);
