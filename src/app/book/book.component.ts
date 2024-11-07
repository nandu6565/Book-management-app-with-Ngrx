// import { Book } from './../models/book';
// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Store, select } from '@ngrx/store';
// import { AddBook, RemoveBook } from '../books/book.action';
// import { Observable } from 'rxjs';
// import { AppState } from '../app.state';


// @Component({
//   selector: 'app-book',
//   templateUrl: './book.component.html',
//   styleUrls: ['./book.component.css']
// })
// export class BookComponent implements OnInit {
//   books: Book[] = [];
//   bookForm: FormGroup;

//   book$: Observable<Book[]>;

//   constructor(private fb: FormBuilder,private store: Store<AppState>) {
//     this.bookForm = this.fb.group({
//       title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
//       author: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]]
//     });
//     this.book$ = store.pipe(select('book'));
//   }

//   ngOnInit() {
//     this.books = this.getBooksFromLocalStorage();
//   }

//   onSubmit() {
//     if (this.bookForm.valid) {
//       const newBook: Book = { 
//         ...this.bookForm.value, 
//         id: `${Date.now()}-${Math.random().toString(36).substring(2, 15)}` // Unique string ID
//       };
//       this.addBookToLocalStorage(newBook);
//       this.books = this.getBooksFromLocalStorage();
//       this.bookForm.reset();
//     } else {
//       console.error('Form is invalid');
//     }
//   }
  

//   addBookToLocalStorage(book: Book): void {
//     const books = this.getBooksFromLocalStorage();
//     books.push(book);
//     localStorage.setItem('books', JSON.stringify(books));
//   }

//   getBooksFromLocalStorage(): Book[] {
//     const booksString = localStorage.getItem('books');
//     return booksString ? JSON.parse(booksString) : [];
//   }

//   deleteBook(bookId: string): void {
//     const books = this.getBooksFromLocalStorage();
//     const updatedBooks = books.filter(book => book.id !== bookId);
//     localStorage.setItem('books', JSON.stringify(updatedBooks));
//     this.books = updatedBooks; // Update the displayed list
//   }

//   addBook(id:string,title: string,author:string){
//     this.store.dispatch(AddBook({id,title,author}))
//   }

//   removeBook(bookId:string){
//     this.store.dispatch(RemoveBook({bookId}));
//   }
  
// }


import { Book } from './../models/book';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { AddBook, RemoveBook } from '../books/book.action';
import { Observable } from 'rxjs';
import { AppState } from '../app.state';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  bookForm: FormGroup;
  books$: Observable<Book[]>; // Observable for books

  constructor(private fb: FormBuilder, private store: Store<AppState>) {
    this.bookForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      author: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]]
    });
    this.books$ = this.store.pipe(select('book')); // Select the book state
  }

  ngOnInit() {}

  onSubmit() {
    if (this.bookForm.valid) {
      const newBook: Book = { 
        ...this.bookForm.value, 
        id: `${Date.now()}-${Math.random().toString(36).substring(2, 15)}` // Unique string ID
      };
      this.store.dispatch(AddBook(newBook)); // Dispatch AddBook action
      this.bookForm.reset();
    } else {
      console.error('Form is invalid');
    }
  }

  removeBook(bookId: string) {
    this.store.dispatch(RemoveBook({ bookId })); // Dispatch RemoveBook action
  }
}
