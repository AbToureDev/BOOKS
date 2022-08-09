import {
    LOAD_COMMENT,
    LOAD_COMMENT_SUCCESS,
    LOAD_COMMENT_ERROR,
    ADD_BOOKS,
    DELETE_BOOKS,
    DELETE_ALL_BOOKS,
    SEARCH_BOOKS,
    SEARCH_BOOKS_SUCCESS, SEARCH_BOOKS_ERROR
} from "./Contants"
import axios from "axios";

export const loadComments=()=>{
    return{
        type: LOAD_COMMENT,
    }
}
export const loadCommentSuccess=(data)=>{
    return{
        type: LOAD_COMMENT_SUCCESS,
        payload: data
    }
};
export const loadCommentError=(error)=>{
    return{
        type: LOAD_COMMENT_ERROR,
        payload: error,
    }
}
export const ApiCall=()=>{
    return (dispatch)=>{
        dispatch(loadComments())
        axios.get("https://jsonplaceholder.typicode.com/comments")
            .then(response=>{
                dispatch(loadCommentSuccess(response.data));
            })
            .catch(error=>{
                dispatch(loadCommentError(error))
            })
    }
}

export const addBooksAction=(data)=>{
   return{
       type:ADD_BOOKS,
       payload:data /*objet*/,
   }
}
export const deleteBooksAction=(id)=>{
   return{
       type:DELETE_BOOKS,
       payload:id /*objet*/,
   }
}
export const deleteAllBooksAction=()=>{
   return{
       type:DELETE_ALL_BOOKS,
   }
}
export const searchBooksAction=()=>{
    return{
        type:SEARCH_BOOKS,
    }
}
export const searchBooksActionSuuccess=(data)=>{
    return{
        type:SEARCH_BOOKS_SUCCESS,
        payload:data,
    }
}
export const searchBooksActionErrors=(err)=>{
    return{
        type:SEARCH_BOOKS_ERROR,
        payload:err,
    }
}

const cle="AIzaSyAt3bzdOfFhI69z89AtEm_Wg_biRTolbcA";
export const apigoogleBook=(titre)=>{
    return(dispatch)=>{
        dispatch(searchBooksAction());
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=${titre}&key=${cle}&maxResults=20&orderBy=newest`)
            .then(response=>{
                dispatch(searchBooksActionSuuccess(response.data.items))
                // console.log(response.data.items)
            })
            .catch(error=>{
                dispatch(searchBooksActionErrors(error))
                // console.error(error)
            })
    }

}