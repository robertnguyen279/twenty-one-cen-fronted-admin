import { Action, Category, CreateProduct } from 'types';

export const Types = {
  GET_CATEGORY: 'product/get-category',
  GET_CATEGORY_SUCCESS: 'product/get-category-success',
  GET_CATEGORY_ERROR: 'product/get-category-error',
  CREATE_PRODUCT: 'product/create-product',
  CREATE_PRODUCT_SUCCESS: 'product/create-product-success',
  CREATE_PRODUCT_ERROR: 'product/create-product-error',
};

export const getCategories = (): Action => ({
  type: Types.GET_CATEGORY,
});

export const getCategoriesSuccess = (categories: Array<Category>): Action<Array<Category>> => ({
  type: Types.GET_CATEGORY_SUCCESS,
  payload: categories,
});

export const getCategoriesError = (): Action => ({
  type: Types.GET_CATEGORY_SUCCESS,
});

export const createProduct = (submitObject: CreateProduct): Action<CreateProduct> => ({
  type: Types.CREATE_PRODUCT,
  payload: submitObject,
});

export const createProductError = (message: string): Action => ({
  type: Types.CREATE_PRODUCT_ERROR,
  payload: { message },
});

export const createProductSuccess = (): Action => ({
  type: Types.CREATE_PRODUCT_SUCCESS,
});
