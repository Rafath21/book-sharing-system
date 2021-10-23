import axios from "axios";
import { GET_SOLD_STATUS_FAIL, GET_SOLD_STATUS_REQUEST, GET_SOLD_STATUS_SUCCESS, UPDATE_SOLD_STATUS_FAILED, UPDATE_SOLD_STATUS_REQUEST , UPDATE_SOLD_STATUS_SUCCESS} from "../constants/soldStatusConstants";
import { CLEAR_ERRORS } from "../constants/homeConstants";

export const sold=(id)=>async(dispatch)=>{
    try{
        dispatch({
            type:GET_SOLD_STATUS_REQUEST
        })
        let {data}=await axios({
                        method: 'get',
                        url: `/api/v1/soldstatus/${id}`,
                        withCredentials: true,
        })
        dispatch({type:GET_SOLD_STATUS_SUCCESS,payload:data})
    }catch(err){
         dispatch({ type: GET_SOLD_STATUS_FAIL, payload: err.response.data.message });
    }
}

export const orderUpdate=(id,orderStatus)=>async(dispatch)=>{
    try{
        dispatch({
            type:UPDATE_SOLD_STATUS_REQUEST
        })
        let {data}=await axios({
            method: 'PUT',
                        url: `/api/v1/soldstatus/${id}`,
                        data:{
                            OrderStatus:orderStatus
                        },
                        withCredentials: true,
    })
        dispatch({type:UPDATE_SOLD_STATUS_SUCCESS,payload:data})
    }catch(err){
        dispatch({type: UPDATE_SOLD_STATUS_FAILED,payload:err.response.data.message})
    }
}