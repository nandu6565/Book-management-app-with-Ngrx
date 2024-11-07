
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
