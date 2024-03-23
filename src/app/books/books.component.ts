import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AppState } from '../states/app.state';
import { GetBooks } from '../actions/app.actions';
import { Book } from '../models/book';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
  books: Book[];
  @Select(AppState.selectStateData) bookInfo$?: Observable<any>;
  constructor(private store: Store){
    this.books = [];
    
  }
  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(): void{
    this.store.dispatch(new GetBooks());
    this.bookInfo$?.subscribe((returnData) => {
      this.books = returnData;
      console.log(this.books);
    })
  }

}
