import axios from 'services/axios.service';

export const getCarousels = (): Promise<any> => axios.get(`/carousel`);
