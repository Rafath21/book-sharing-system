import { HOME_BOOKS_REQUEST,HOME_BOOKS_SUCCESS,HOME_BOOKS_FAIL, CLEAR_ERRORS} from "../constants/homeConstants"
export const homeReducer=(state={books:[]},action)=>{
    switch(action.type){
        case HOME_BOOKS_REQUEST:
        return{
            loading:true,
            books:[]
        }
        case HOME_BOOKS_SUCCESS:{
            return{
                loading:false,
                books:action.payload.books
            }
        }
        case HOME_BOOKS_FAIL:{
            return{
                loading:false,
                error:action.payload
            }
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