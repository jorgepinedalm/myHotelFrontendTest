import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  books:Task[];

  constructor() { 
    this.books = [];
    const abstract = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec finibus purus et ante eleifend, ut mattis massa lacinia. Etiam consequat, tellus id finibus tincidunt, erat mauris aliquam libero, non viverra ligula nunc ac justo. Morbi mollis placerat.";
    const cover = "https://picsum.photos/150/200";
    for(let i = 0; i < 15; i++){
      this.books.push({idTask: i+1, cover: cover, title: "My favorite book " + (i+1), abstract: abstract, authors: ["Jorge Pineda"], publicationDate: this.generateRandomDate(), rating: Math.random() * 5, visible: true});
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

  fetchTasks(){
    return of(this.books);
  }

  getTaskById(id:number):Observable<Task | undefined>{
    return of(this.books.find(book => book.idTask == id))
  }

  addTasks(bookData:Task):Observable<Task>{
    return of(bookData);
  }

  deleteTask(id:number){
    return of(this.books.filter(book => book.idTask != id));
  }

  updateTask(payload:Task,id:number){
    let foundTask = this.books.find(book => book.idTask == id);
    if(foundTask){
      foundTask = {...foundTask, ...payload};
    }
    return of(foundTask);
  }
}
