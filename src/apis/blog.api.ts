import axios from 'services/axios.service';

export const getBlogs = (): Promise<any> => axios.get(`/post?limit=99999`);
