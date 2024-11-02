import { Book } from './../models/book.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  books: Book[] = [];
  bookForm: FormGroup;

  

  constructor(private fb: FormBuilder) {
    this.bookForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      author: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]]
    });
  }

  ngOnInit() {
    this.books = this.getBooksFromLocalStorage();
  }

  onSubmit() {
    if (this.bookForm.valid) {
      const newBook: Book = { ...this.bookForm.value, id: Date.now() }; // Unique ID
      this.addBookToLocalStorage(newBook);
      this.books = this.getBooksFromLocalStorage();
      this.bookForm.reset();
    } else {
      console.error('Form is invalid');
    }
  }

  addBookToLocalStorage(book: Book): void {
    const books = this.getBooksFromLocalStorage();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  getBooksFromLocalStorage(): Book[] {
    const booksString = localStorage.getItem('books');
    return booksString ? JSON.parse(booksString) : [];
  }

  deleteBook(bookId: number): void {
    const books = this.getBooksFromLocalStorage();
    const updatedBooks = books.filter(book => book.id !== bookId);
    localStorage.setItem('books', JSON.stringify(updatedBooks));
    this.books = updatedBooks; // Update the displayed list
  }
}
