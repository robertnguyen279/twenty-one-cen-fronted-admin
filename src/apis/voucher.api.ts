import axios from 'services/axios.service';

export const getVouchers = (): Promise<any> => axios.get(`/voucher`);
