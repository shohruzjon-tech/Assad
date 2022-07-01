import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from './user-redux/user.slice';
import orderReducer from './order-redux/order.slice';
import productReducer from './product-redux/product.slice';
import updateOrderReducer from './order-redux/update';

const persistConfig = {
  key: "root",
  storage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
    user: userReducer,
    order: orderReducer,
    product: productReducer,
    updateOrder: updateOrderReducer,
});

export default persistReducer(persistConfig, rootReducer);