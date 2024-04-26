import {
  applyMiddleware,
  combineReducers,
  legacy_createStore,
  compose,
} from "redux";
import { thunk } from "redux-thunk";
import { authReducer } from "./Auth/Reducer";
import { customerProductReducer } from "./Product/Reducer";
import { cartReducer } from "./Cart/Reducer";
import { orderReducer } from "./Order/Reducer";
import filterReducer from "./Filter/Reducer";
import adminordersReducer from "./Admin/Order/AdminReducer";
import sellerReducer from "./Seller/Reducer";
import sellerProductsReducer from "./Seller/Products/Reducer";

const rootReducers = combineReducers({
  auth: authReducer,
  product: customerProductReducer,
  cart: cartReducer,
  order: orderReducer,
  filter: filterReducer,
  adminOrder: adminordersReducer,
  seller: sellerReducer,
  sellerproduct: sellerProductsReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = legacy_createStore(
  rootReducers,
  composeEnhancers(applyMiddleware(thunk))
);
export default store;
