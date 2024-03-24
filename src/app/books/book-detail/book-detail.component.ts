import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GetBookById } from 'src/app/actions/app.actions';
import { Book } from 'src/app/models/book';
import { AppState } from 'src/app/states/app.state';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent {
  bookDetail?: Book;
  @Select(AppState.selectSelectedBook) selectedBook$?: Observable<Book>;

  constructor(
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){
    const idBook = data.dataKey;
    this.store.dispatch(new GetBookById(idBook));
  }
}
