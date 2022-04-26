import { combineReducers } from 'redux';
import userReducer from './user.reducer';
import productReducer from './product.reducer';
import orderReducer from './order.reducer';
import voucherReducer from './voucher.reducer';
import blogReducer from './blog.reducer';
import carouselReducer from './carousel.reducer';

const rootReducer = combineReducers({
  userReducer,
  productReducer,
  orderReducer,
  voucherReducer,
  blogReducer,
  carouselReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
