import { Action, Carousel } from 'types';

export const Types = {
  GET_CAROUSELS: 'carousel/get-carousels',
  GET_CAROUSELS_SUCCESS: 'carousels/get-carousels-success',
  GET_CAROUSELS_ERROR: 'carousels/get-carousels-error',
};

export const getCarousels = (): Action => ({
  type: Types.GET_CAROUSELS,
});

export const getCarouselsSuccess = (products: Array<Carousel>): Action<Array<Carousel>> => ({
  type: Types.GET_CAROUSELS_SUCCESS,
  payload: products,
});

export const getBlogsError = (message: string): Action => ({
  type: Types.GET_CAROUSELS_ERROR,
  payload: { message },
});
