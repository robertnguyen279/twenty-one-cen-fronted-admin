import axios from 'services/axios.service';

export const getCategories = (): Promise<any> => axios.get(`/product/category`);
