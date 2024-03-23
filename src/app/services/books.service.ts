import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  books:any[];

  constructor() { 
    this.books = [
      {id: 1, title: "My favorite book", abstract: "03:20", gender: "comedy", rating: 5},
      {id: 2, title: "My favorite book part 2", abstract: "03:20", gender: "comedy", rating: 5}
    ];
  }

  fetchBooks(){
    return of(this.books);
  }

  addBooks(bookData:any){
    return of([...this.books, bookData]);
  }

  deleteBook(id:number){
    return of(this.books.filter(book => book.id != id));
  }

  updateBook(payload:any,id:number){
    let foundBook = this.books.find(book => book.id == id);
    if(foundBook){
      foundBook = {...foundBook, payload};
    }
    return of(foundBook);
  }
}
