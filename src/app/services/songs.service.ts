import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SongsService {

  songs:any[];

  constructor() { 
    this.songs = [
      {id: 1, name: "My favorite song", duration: "03:20", gender: "pop", rating: 5}
    ];
  }

  fetchSongs(){
    return of(this.songs);
  }

  addSongs(songData:any){
    return of([...this.songs, songData]);
  }

  deleteSong(id:number){
    return of(this.songs.filter(song => song.id != id));
  }

  updateSong(payload:any,id:number){
    let foundSong = this.songs.find(song => song.id == id);
    if(foundSong){
      foundSong = {...foundSong, payload};
    }
    return of(foundSong);
  }
}
