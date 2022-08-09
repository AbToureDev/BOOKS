// eslint-disable-next-line no-unused-vars
import {LOAD_COMMENT,LOAD_COMMENT_SUCCESS,LOAD_COMMENT_ERROR,ADD_BOOKS,DELETE_BOOKS,DELETE_ALL_BOOKS,SEARCH_BOOKS,SEARCH_BOOKS_SUCCESS,SEARCH_BOOKS_ERROR} from "./Contants"
import {v4 as uuiv4} from "uuid"
const inititialStateComments={
    isLoading:false,
    comments:[],
    errors:"",
}
const initialStatBooks={
    books:[]
}
const helpersAdddata=(action)=>{
    return {
        id:uuiv4(),
        title:action.payload.title,
        auteur:action.payload.auteur
    }
};
const initialStatSearch={
    isLoading: false,
    fetchBook:[],
    error:""
}
const removeDataById=(state,id)=>{
   const books= state.filter(dt=>dt.id !== id)
    return books
};
export const CommentSReducer=(state=inititialStateComments,action)=>{
    switch(action.type){
        case LOAD_COMMENT:
            return{
                ...state,
                isLoading:true,
                
            }
        case LOAD_COMMENT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                comments:action.payload,
            }
        case LOAD_COMMENT_ERROR:
            return {
                ...state,
                errors: action.payload,
            }
        default:
            return state
    }
}

export const booksReducer = (state=initialStatBooks.books, action) =>{
    if(localStorage.getItem("booksData")){
        state=JSON.parse(localStorage.getItem("booksData"))
    }
    switch (action.type) {
        case ADD_BOOKS:
            state=[...state,helpersAdddata(action)]
            localStorage.setItem("booksData", JSON.stringify(state))
            return state
        case DELETE_BOOKS:
            state=removeDataById(state,action.payload)
            localStorage.setItem("booksData", JSON.stringify(state))
            return state;
            case DELETE_ALL_BOOKS:
                state=[]
                localStorage.setItem("booksData", JSON.stringify(state))
            return state;
        default:
            return state;
    }
}

export const searchReducer = (state=initialStatSearch,action)=>{
    switch (action.type){
        case SEARCH_BOOKS:
            return{
                ...state,
                isLoading: true,
            }
        case SEARCH_BOOKS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                fetchBook: action.payload,
                error: '',
            }
        case SEARCH_BOOKS_ERROR:
            return{
                ...state,
                isLoading: false,
                fetchBook:[],
                error: action.payload,
            }
        default:
            return state
    }
}