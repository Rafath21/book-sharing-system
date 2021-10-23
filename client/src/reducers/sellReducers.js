import { CLEAR_ERRORS } from "../constants/homeConstants";
import { SELL_BOOK_REQUEST,SELL_BOOK_SUCCESS,SELL_BOOK_FAIL,GET_SOLD_BOOKS_REQUEST, GET_SOLD_BOOKS_SUCCESS, GET_SOLD_BOOKS_FAIL } from "../constants/sellConstants";
export const soldReducer=(state={soldBooks:[]},action)=>{
    switch (action.type) {
        case GET_SOLD_BOOKS_REQUEST:
            return{
                loading:true,
                soldBooks:[]
            }
        case GET_SOLD_BOOKS_SUCCESS:
            return{
                loading:false,
                soldBooks:action.payload
            }
        case GET_SOLD_BOOKS_FAIL:
            return{
                loading:false,
                error:action.payload
            }
        case CLEAR_ERRORS:{
            return{
                ...state,
                error:null,
            }
        }
        default:
            return state;
    }
}
export const sellReducer=(state={result:false},action)=>{
    switch(action.type){
        case SELL_BOOK_REQUEST:
            return{
                loading:true,
                result:false
            }
        case SELL_BOOK_SUCCESS:
            return{
                loading:false,
                result:action.payload
            }
        case SELL_BOOK_FAIL:
            return{
                loading:false,
                error:action.payload
            }
            default:
                return state;
    }
}
