import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  books:Book[];

  constructor() { 
    this.books = [
      {idBook: 1, title: "My favorite book", abstract: "03:20", authors: ["Jorge Pineda"], rating: 5, visible: true},
      {idBook: 2, title: "My favorite book part 2", abstract: "03:20", authors: ["Jorge Pineda"], rating: 5, visible: true}
    ];
  }

  fetchBooks(){
    return of(this.books);
  }

  addBooks(bookData:Book):Observable<Book>{
    return of(bookData);
  }

  deleteBook(id:number){
    return of(this.books.filter(book => book.idBook != id));
  }

  updateBook(payload:Book,id:number){
    let foundBook = this.books.find(book => book.idBook == id);
    if(foundBook){
      foundBook = {...foundBook, ...payload};
    }
    return of(foundBook);
  }
}
