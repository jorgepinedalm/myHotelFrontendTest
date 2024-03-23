import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  books:Book[];

  constructor() { 
    this.books = [];
    for(let i = 0; i < 15; i++){
      this.books.push({idBook: i+1, title: "My favorite book", abstract: "03:20", authors: ["Jorge Pineda"], rating: Math.random() * 5, visible: true});
    }
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
