import { Action, Category } from 'types';

export const Types = {
  GET_CATEGORY: 'product/get-category',
  GET_CATEGORY_SUCCESS: 'product/get-category-success',
  GET_CATEGORY_ERROR: 'product/get-category-error',
};

export const getCategories = (): Action => ({
  type: Types.GET_CATEGORY,
});

export const getCategoriesSuccess = (categories: Array<Category>): Action<Array<Category>> => ({
  type: Types.GET_CATEGORY_SUCCESS,
  payload: categories,
});

export const getCategoriesError = (): Action => ({
  type: Types.GET_CATEGORY_ERROR,
});
