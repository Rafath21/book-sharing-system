import { GET_SOLD_STATUS_FAIL, GET_SOLD_STATUS_REQUEST, GET_SOLD_STATUS_SUCCESS, UPDATE_SOLD_STATUS_FAILED, UPDATE_SOLD_STATUS_SUCCESS, UPDATE_SOLD_STATUS_REQUEST } from "../constants/soldStatusConstants";

export const soldStatusReducer=(state={soldStatus:[]},action)=>{
    switch(action.type){
        case GET_SOLD_STATUS_REQUEST:
            return{
                loading:true,
                soldStatus:[]
            }
        case GET_SOLD_STATUS_SUCCESS:
            return{
                loading:false,
                soldStatus:action.payload
            }
        case GET_SOLD_STATUS_FAIL:
            return{
                loading:false,
                error:action.payload
            }
            default:
                return state;
    }
}
export const orderUpdateReducer=(state={isOrderUpdated:false},action)=>{
    switch(action.type){
        case UPDATE_SOLD_STATUS_REQUEST:
            return{
                loading:true,
                isOrderUpdated:false
            }
        case UPDATE_SOLD_STATUS_SUCCESS:
            return{
                loading:false,
                isOrderUpdated:true
            }
        case UPDATE_SOLD_STATUS_FAILED:
            return{
                loading:false,
                error:action.payload
            }
            default:
                return state;
    }
}
