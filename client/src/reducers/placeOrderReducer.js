import { CLEAR_ERRORS } from "../constants/homeConstants";
import { PLACE_ORDER_FAIL, PLACE_ORDER_REQUEST, PLACE_ORDER_SUCCESS } from "../constants/placeorderConstants";

export const placeOrderReducer=(state={orderPlaced:false},action)=>{
    switch(action.type){
        case PLACE_ORDER_REQUEST:
            return{
                loading:true,
                orderPlaced:false
            }
        case PLACE_ORDER_SUCCESS:
            return{
                loading:false,
                orderPlaced:true
            }
        case PLACE_ORDER_FAIL:
            return{
                loading:false,
                error:action.payload
            }
            default:
                return state;
    }
}
