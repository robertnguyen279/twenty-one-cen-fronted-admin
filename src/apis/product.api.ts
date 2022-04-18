import axios from 'services/axios.service';
import { CreateProduct } from 'types';

export const getCategories = (): Promise<any> => axios.get(`/product/category`);
export const createProduct = (submitObject: CreateProduct): Promise<any> => axios.post(`/product/`, submitObject);
