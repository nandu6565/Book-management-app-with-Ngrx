import { Book } from './../models/book';
import { createReducer,on } from "@ngrx/store";
import { AddBook,RemoveBook,AddBookSuccess,AddBookFailure } from "./book.action";

export const initialState: ReadonlyArray<Book> = [];

export const BookReducer = createReducer(
    initialState,
    on(AddBook,(state,{id,title,author}) => [...state,{id,title,author}]),
    on(AddBookSuccess, (state,{id,title,author}) => [...state,{id,title,author}]),
    on(AddBookFailure, (state,{error}) => {
        console.error(error);
        return state;
    }),

    on(RemoveBook,(state,{bookId})=> state.filter(book => book.id != bookId))
);