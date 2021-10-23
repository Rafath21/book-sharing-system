import axios from "axios";
import { CLEAR_ERRORS } from "../constants/homeConstants";
import { GET_MY_ORDERS_FAIL, GET_MY_ORDERS_REQUEST, GET_MY_ORDERS_SUCCESS } from "../constants/myOrdersConstants";

export const myOrders=(username)=>async(dispatch)=>{
    try{
        dispatch({
            type:GET_MY_ORDERS_REQUEST
        })
        let {data}=await axios({
                        method: 'get',
                       withCredentials: true,
                        url: `http://localhost:8000/api/v1/orders/${username}`
        })
        dispatch({type:GET_MY_ORDERS_SUCCESS,payload:data.orders})
    
}catch(err){
         dispatch({ type: GET_MY_ORDERS_FAIL, payload: err.response.data.message });
    }
}