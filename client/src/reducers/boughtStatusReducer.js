import { GET_BOUGHT_STATUS_FAIL, GET_BOUGHT_STATUS_REQUEST, GET_BOUGHT_STATUS_SUCCESS } from "../constants/boughtStatusConstants";
import { CLEAR_ERRORS } from "../constants/homeConstants";

export const boughtStatusReducer=(state={boughtStatus:[]},action)=>{
    switch(action.type){
        case GET_BOUGHT_STATUS_REQUEST:
            return{
                loading:true,
                boughtStatus:[]
            }
        case GET_BOUGHT_STATUS_SUCCESS:
            return{
                loading:false,
                boughtStatus:action.payload
            }
        case GET_BOUGHT_STATUS_FAIL:
            return{
                loading:false,
                error:action.payload
            }
            default:
                return state;
    }
}
