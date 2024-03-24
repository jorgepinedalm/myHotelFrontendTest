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
      this.books.push({idBook: i+1, title: "My favorite book " + (i+1), abstract: "03:20", authors: ["Jorge Pineda"], publicationDate: this.generateRandomDate(), rating: Math.random() * 5, visible: true});
    }
  }

  private generateRandomDate(): Date{
    const startDate = new Date(2020, 0, 1);
    const endDate = new Date();
    var range = endDate.getTime() - startDate.getTime();
    var randomDate = new Date(startDate.getTime() + Math.random() * range);
    return randomDate;
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
