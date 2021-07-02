import { createStore, combineReducers } from 'redux';

import { cartItemsReducer } from './cartSlice';
import { userReducer } from './userSlice';
import { orderDetailsReducer } from './orderDetailsSlice';
import { businessReducer } from './businessSlice';

const reducers = combineReducers({
    cartItems: cartItemsReducer,
    userDetails: userReducer,
    orderDetails: orderDetailsReducer,
    businessDetails: businessReducer
})

const store = createStore(reducers);

export default store;