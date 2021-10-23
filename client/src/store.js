import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import { homeReducer } from "./reducers/homeReducers";
import { sellReducer, soldReducer } from "./reducers/sellReducers";
import { placeOrderReducer } from "./reducers/placeOrderReducer";
import { getOrdersReducer } from "./reducers/myOrdersReducer";
import { boughtStatusReducer } from "./reducers/boughtStatusReducer";
import { orderUpdateReducer, soldStatusReducer } from "./reducers/soldStatusReducer";
import { authReducer} from "./reducers/authReducers";
import { allbooksReducer, allordersReducer, allusersReducer } from "./reducers/adminReducers";

const reducer=combineReducers({
    books:homeReducer,
    soldBooks:soldReducer,
    result:sellReducer,
    orderPlaced:placeOrderReducer,
    orders:getOrdersReducer,
    boughtStatus:boughtStatusReducer,
    soldStatus:soldStatusReducer,
    user:authReducer,
    isOrderUpdated:orderUpdateReducer,
    allbooks:allbooksReducer,
    allorders:allordersReducer,
    allusers:allusersReducer
});

let initialState={};

const middleware=[thunk];

const store=createStore(
    reducer,initialState,composeWithDevTools(applyMiddleware(...middleware))
)

export default store;