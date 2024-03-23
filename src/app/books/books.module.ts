import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksComponent } from './books.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { SongCreateComponent } from './book-create/song-create.component';
import { BooksRoutingModule } from './books-routing.module';



@NgModule({
  declarations: [
    BooksComponent,
    BookDetailComponent,
    SongCreateComponent
  ],
  imports: [
    CommonModule,
    BooksRoutingModule
  ]
})
export class BooksModule { }