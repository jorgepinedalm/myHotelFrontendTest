import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DataList } from '../models/data-list.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private categories:DataList[];
  private priorities:DataList[];

  constructor() { 
    this.categories = [
      {id: 1, value: "Home"},
      {id: 2, value: "Work"},
      {id: 3, value: "Friends"},
      {id: 4, value: "Family"},
      {id: 5, value: "Other"}
    ]
    this.priorities = [
      {id: 1, value: "Low"},
      {id: 2, value: "Medium"},
      {id: 3, value: "High"}
    ];
  }

  getCategories():Observable<DataList[]>{
    return of(this.categories);
  }

  getPriorities():Observable<DataList[]>{
    return of(this.priorities);
  }
}
