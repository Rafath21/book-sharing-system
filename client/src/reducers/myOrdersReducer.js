import { CLEAR_ERRORS } from "../constants/homeConstants";
import { GET_MY_ORDERS_FAIL, GET_MY_ORDERS_REQUEST, GET_MY_ORDERS_SUCCESS } from "../constants/myOrdersConstants";

export const getOrdersReducer=(state={orders:[]},action)=>{
    switch(action.type){
        case GET_MY_ORDERS_REQUEST:
            return{
                loading:true,
                orders:[]
            }
        case GET_MY_ORDERS_SUCCESS:
            return{
                loading:false,
                orders:action.payload
            }
        case GET_MY_ORDERS_FAIL:
            return{
                loading:false,
                error:action.payload
            }
            default:
                return state;
    }
}
