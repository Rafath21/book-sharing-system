import axios from "axios";
import { HOME_BOOKS_REQUEST,HOME_BOOKS_SUCCESS,HOME_BOOKS_FAIL, CLEAR_ERRORS} from "../constants/homeConstants"

export const getBooks=()=>async(dispatch)=>{
    try{
        dispatch({
            type:HOME_BOOKS_REQUEST
        })
        const {data}=await axios.get("/api/v1/home");
        dispatch({
            type:HOME_BOOKS_SUCCESS,
            payload:data,
        })

    }
    catch(err){
        dispatch({
            type:HOME_BOOKS_FAIL,
            payload:err.response.data.message
        })
    }
}
export const clearErrors=()=>async(dispatch)=>{
    dispatch({type:CLEAR_ERRORS})
}