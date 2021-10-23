import {ADMIN_GET_ALL_BOOKS_REQUEST,ADMIN_GET_ALL_BOOKS_SUCCESS,ADMIN_GET_ALL_BOOKS_FAILED,
ADMIN_GET_ALL_USERS_REQUEST,ADMIN_GET_ALL_USERS_SUCCESS,ADMIN_GET_ALL_USERS_FAILED,
ADMIN_GET_ALL_ORDERS_REQUEST,ADMIN_GET_ALL_ORDERS_SUCCESS,ADMIN_GET_ALL_ORDERS_FAILED, CLEAR_ERRORS
} from "../constants/adminConstants";
import axios from "axios";
export const getallBooks=()=>async(dispatch)=>{
    try{
        dispatch({
            type:ADMIN_GET_ALL_BOOKS_REQUEST
        })
         const {data}=await axios({
                        method: 'GET',
                        url: "/api/v1/allbooks",
                        withCredentials: true
        })
        dispatch({
            type:ADMIN_GET_ALL_BOOKS_SUCCESS,
            payload:data,
        })

    }
    catch(err){
        dispatch({
            type:ADMIN_GET_ALL_BOOKS_FAILED,
            payload:err.response.data.message
        })
    }
}
export const clearErrors=()=>async(dispatch)=>{
    dispatch({type:CLEAR_ERRORS})
}
export const getallUsers=()=>async(dispatch)=>{
    try{
        dispatch({
            type:ADMIN_GET_ALL_USERS_REQUEST
        })
         const {data}=await axios({
                        method: 'GET',
                        url: "/api/v1/allusers",
                        withCredentials: true
      
        })
        dispatch({
            type:ADMIN_GET_ALL_USERS_SUCCESS,
            payload:data,
        })
    }
    catch(err){
        dispatch({
            type:ADMIN_GET_ALL_USERS_FAILED,
            payload:err.response.data.message
        })
    }
}
export const getallOrders=()=>async(dispatch)=>{
    try{
        dispatch({
            type:ADMIN_GET_ALL_ORDERS_REQUEST
        })
         const {data}=await axios({
                        method: 'GET',
                        url: "/api/v1/allorders",
                        withCredentials: true
        })
        dispatch({
            type:ADMIN_GET_ALL_ORDERS_SUCCESS,
            payload:data,
        })

    }
    catch(err){
        dispatch({
            type:ADMIN_GET_ALL_ORDERS_FAILED,
            payload:err.response.data.message
        })
    }
}