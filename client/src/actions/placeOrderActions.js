import axios from "axios";
import { CLEAR_ERRORS } from "../constants/homeConstants";
import { PLACE_ORDER_FAIL, PLACE_ORDER_REQUEST, PLACE_ORDER_SUCCESS } from "../constants/placeorderConstants";

export const placeOrder=(username,bookid,shippingInfo,paymentInfo)=>async(dispatch)=>{
    try{
        dispatch({
            type:PLACE_ORDER_REQUEST
        })
        const config = { headers: { "Content-Type": "application/json" } };
        await axios({
                        method: 'post',
                        url: `http://localhost:8000/api/v1/placeorder/${username}?bookid=${bookid}`,
                        withCredentials: true,
                        data: {
                          shippingInfo:shippingInfo,
                          paymentInfo:paymentInfo
                        },config
        })
        dispatch({type:PLACE_ORDER_SUCCESS,payload:true})
    }catch(err){
         dispatch({ type: PLACE_ORDER_FAIL, payload: err.response.data.message });
    }
}