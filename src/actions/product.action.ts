import { Action, Category, CreateProduct, Product, DeleteProduct } from 'types';

export const Types = {
  GET_CATEGORY: 'product/get-category',
  GET_CATEGORY_SUCCESS: 'product/get-category-success',
  GET_CATEGORY_ERROR: 'product/get-category-error',
  GET_PRODUCTS: 'product/get-products',
  GET_PRODUCTS_SUCCESS: 'product/get-products-success',
  GET_PRODUCTS_ERROR: 'product/get-products-error',
  DELETE_PRODUCT: 'product/delete-product',
  DELETE_PRODUCT_SUCCESS: 'product/delete-product-success',
  DELETE_PRODUCT_ERROR: 'product/delete-product-error',
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

export const getProducts = (): Action => ({
  type: Types.GET_PRODUCTS,
});

export const getProductsSuccess = (products: Array<Product>): Action<Array<Product>> => ({
  type: Types.GET_PRODUCTS_SUCCESS,
  payload: products,
});

export const getProductsError = (message: string): Action => ({
  type: Types.GET_PRODUCTS_ERROR,
  payload: { message },
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

export const deleteProduct = (id: string): Action<DeleteProduct> => ({
  type: Types.DELETE_PRODUCT,
  payload: { id },
});

export const deleteProductError = (): Action<DeleteProduct> => ({
  type: Types.DELETE_PRODUCT_ERROR,
});

export const deleteProductSuccess = (): Action => ({
  type: Types.DELETE_PRODUCT_SUCCESS,
});
