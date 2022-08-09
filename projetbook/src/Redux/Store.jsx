import {configureStore} from "@reduxjs/toolkit";
import {booksReducer, CommentSReducer, searchReducer} from "./Reducers";
import thunk from "redux-thunk";
const Store= configureStore({
    reducer:{
        comments:CommentSReducer,
        library:booksReducer,
        rechercher:searchReducer
    },
    middleware:[thunk]

})
export default Store