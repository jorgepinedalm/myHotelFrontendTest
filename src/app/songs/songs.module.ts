import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SongsComponent } from './songs.component';
import { SongDetailComponent } from '../song-detail/song-detail.component';
import { SongCreateComponent } from '../song-create/song-create.component';



@NgModule({
  declarations: [
    SongsComponent,
    SongDetailComponent,
    SongCreateComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SongsModule { }
