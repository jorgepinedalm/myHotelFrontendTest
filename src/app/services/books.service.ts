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
    const abstract = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec finibus purus et ante eleifend, ut mattis massa lacinia. Etiam consequat, tellus id finibus tincidunt, erat mauris aliquam libero, non viverra ligula nunc ac justo. Morbi mollis placerat.";
    const cover = "https://picsum.photos/150/200";
    for(let i = 0; i < 15; i++){
      this.books.push({idBook: i+1, cover: cover, title: "My favorite book " + (i+1), abstract: abstract, authors: ["Jorge Pineda"], publicationDate: this.generateRandomDate(), rating: Math.random() * 5, visible: true});
    }
    this.books[10].authors.push("Pepito perez Parra");
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

  getBookById(id:number):Observable<Book | undefined>{
    return of(this.books.find(book => book.idBook == id))
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
