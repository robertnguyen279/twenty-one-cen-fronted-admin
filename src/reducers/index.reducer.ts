import { combineReducers } from 'redux';
import userReducer from './user.reducer';
import productReducer from './product.reducer';

const rootReducer = combineReducers({ userReducer, productReducer });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
