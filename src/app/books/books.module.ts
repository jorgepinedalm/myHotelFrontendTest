import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksComponent } from './books.component';
import { SongDetailComponent } from './book-detail/song-detail.component';
import { SongCreateComponent } from './book-create/song-create.component';



@NgModule({
  declarations: [
    BooksComponent,
    SongDetailComponent,
    SongCreateComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SongsModule { }
