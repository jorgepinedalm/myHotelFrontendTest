import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from '../models/task';
import { PriorityTask } from '../enums/priority-task';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  tasks:Task[];

  constructor() { 
    this.tasks = [];
    this.mockData();
  }

  private mockData(): void{
    const categories = ['Home', 'Work', 'Friends', 'Other'];
    const priorities:any = [
      {id: 1, value: "High"},
      {id: 2, value: "Medium"},
      {id: 3, value: "Low"},
    ];
    for (let i = 1; i <= 10; i++) {
      const task = {
        idTask: i,
        title: `Tarea ${i}`,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.',
        category: categories[Math.floor(Math.random() * categories.length)],
        priority: priorities[Math.floor(Math.random() * 2)],
        when: this.generateRandomDate(),
        where: `Lugar ${i}`,
        isDone: false
      };
    
      // Verificar si la tarea está completada
      if (task.when <= new Date()) {
        task.isDone = true;
      }
    
      this.tasks.push(task);
    }

  }

  private generateRandomDate(): Date{
    const startDate = new Date(2024, 0, 1);
    const endDate = new Date(2024, 7, 30);
    const range = endDate.getTime() - startDate.getTime();
    const randomDate = new Date(startDate.getTime() + Math.random() * range);
    return randomDate;
  }

  fetchTasks(){
    return of(this.tasks);
  }

  getTaskById(id:number):Observable<Task | undefined>{
    return of(this.tasks.find(task => task.idTask == id))
  }

  addTasks(taskData:Task):Observable<Task>{
    return of(taskData);
  }

  deleteTask(id:number){
    return of(this.tasks.filter(task => task.idTask != id));
  }

  updateTask(payload:Task,id:number){
    let foundTask = this.tasks.find(task => task.idTask == id);
    if(foundTask){
      foundTask = {...foundTask, ...payload};
    }
    return of(foundTask);
  }
}
