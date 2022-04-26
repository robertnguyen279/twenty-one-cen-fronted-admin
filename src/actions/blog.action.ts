import { Action, Blog } from 'types';

export const Types = {
  GET_BLOGS: 'blog/get-blogs',
  GET_BLOGS_SUCCESS: 'blog/get-blogs-success',
  GET_BLOGS_ERROR: 'blog/get-blogs-error',
};

export const getBlogs = (): Action => ({
  type: Types.GET_BLOGS,
});

export const getBlogsSuccess = (products: Array<Blog>): Action<Array<Blog>> => ({
  type: Types.GET_BLOGS_SUCCESS,
  payload: products,
});

export const getBlogsError = (message: string): Action => ({
  type: Types.GET_BLOGS_ERROR,
  payload: { message },
});
