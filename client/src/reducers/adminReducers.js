import {ADMIN_GET_ALL_BOOKS_REQUEST,ADMIN_GET_ALL_BOOKS_SUCCESS,ADMIN_GET_ALL_BOOKS_FAILED,
ADMIN_GET_ALL_USERS_REQUEST,ADMIN_GET_ALL_USERS_SUCCESS,ADMIN_GET_ALL_USERS_FAILED,
ADMIN_GET_ALL_ORDERS_REQUEST,ADMIN_GET_ALL_ORDERS_SUCCESS,ADMIN_GET_ALL_ORDERS_FAILED, CLEAR_ERRORS
} from "../constants/adminConstants";
export const allbooksReducer=(state={allbooks:[]},action)=>{
    switch(action.type){
        case ADMIN_GET_ALL_BOOKS_REQUEST:
        return{
            loading:true,
            allbooks:[]
        }
        case ADMIN_GET_ALL_BOOKS_SUCCESS:
            return{
                loading:false,
                allbooks:action.payload.books
            }
        
        case ADMIN_GET_ALL_BOOKS_FAILED:
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
export const allusersReducer=(state={allusers:[]},action)=>{
    switch(action.type){
        case ADMIN_GET_ALL_USERS_REQUEST:
        return{
            loading:true,
            allusers:[]
        }
        case ADMIN_GET_ALL_USERS_SUCCESS:
            return{
                loading:false,
                allusers:action.payload
            }
        
        case ADMIN_GET_ALL_USERS_FAILED:
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
export const allordersReducer=(state={allorders:[]},action)=>{
    switch(action.type){
        case ADMIN_GET_ALL_ORDERS_REQUEST:
        return{
            loading:true,
            allorders:[]
        }
        case ADMIN_GET_ALL_ORDERS_SUCCESS:
            return{
                loading:false,
                allorders:action.payload
            }
        
        case ADMIN_GET_ALL_ORDERS_FAILED:
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