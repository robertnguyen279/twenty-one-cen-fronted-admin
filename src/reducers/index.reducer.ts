import { combineReducers } from 'redux';
import userReducer from './user.reducer';
import productReducer from './product.reducer';
import orderReducer from './order.reducer';

const rootReducer = combineReducers({ userReducer, productReducer, orderReducer });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
