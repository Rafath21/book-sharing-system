import axios from "axios";
import { CLEAR_ERRORS } from "../constants/homeConstants";
import { SELL_BOOK_REQUEST,SELL_BOOK_SUCCESS,SELL_BOOK_FAIL, GET_SOLD_BOOKS_REQUEST, GET_SOLD_BOOKS_SUCCESS, GET_SOLD_BOOKS_FAIL } from "../constants/sellConstants";

export const getSoldBooks=(id)=>async(dispatch)=>{
    try{
        
        dispatch({
            type:GET_SOLD_BOOKS_REQUEST
        })
        const {data}=await axios({
            method:"GET",
            withCredentials: true,
            url:`http://localhost:8000/api/v1/sell/${id}`,
           
        });
        dispatch({
            type:GET_SOLD_BOOKS_SUCCESS,
            payload:data.soldBooks
        })
              
    }
    catch(err){
         dispatch({
            type:GET_SOLD_BOOKS_FAIL,
            payload:err.response.data.message
        })
    }
}
export const sellBook=(id,bookname,bookprice,bookImg,shipsTo,cardno)=>async(dispatch)=>{
    try{
        dispatch({
            type:SELL_BOOK_REQUEST
        })
        await axios({
            method: 'post',
            withCredentials: true,
            url: `http://localhost:8000/api/v1/sell/${id}`,
            data: {
                    img: bookImg,
                    price: bookprice,
                    shipsTo:shipsTo,
                    cardno:cardno,
                    bookname:bookname
                }
        })
        dispatch({type:SELL_BOOK_SUCCESS,payload:true})
    }catch(err){
         dispatch({ type: SELL_BOOK_FAIL, payload: err.response.data.message });
    }
}