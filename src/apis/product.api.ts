import axios from 'services/axios.service';
import { CreateProduct, DeleteProduct } from 'types';

export const getCategories = (): Promise<any> => axios.get(`/product/category`);
export const getProducts = (): Promise<any> => axios.get(`/product/find?limit=99999`);
export const deleteProduct = ({ id }: DeleteProduct): Promise<any> => axios.delete(`/product/${id}`);
export const createProduct = (submitObject: CreateProduct): Promise<any> => axios.post(`/product/`, submitObject);
