import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { GetTaskById, UpdateTasks } from 'src/app/actions/app.actions';
import { AppState } from 'src/app/states/app.state';
import { Task } from "../../models/task";

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss']
})
export class TaskEditComponent {

  @Select(AppState.selectSelectedTask) selectedTask$?: Observable<Task>;
  initialState?:Task;
  dataForm?:Task;
  idTask:number;
  
  constructor(
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){
    this.idTask = data.dataKey;
    this.store.dispatch(new GetTaskById(this.idTask));
    this.selectedTask$?.subscribe((task:Task) => {
      this.initialState = {...task};
    })
  }

  linkFormData(data:Task):void{
    this.dataForm = data;
  }

  editTask():void{
    this.store.dispatch(new UpdateTasks(this.dataForm as Task, this.idTask));
  }

  onDateInput(event: any) {
    console.log(event);
    if (event.value) {
      // Format the date manually
      const formattedDate = moment(event.value).format('DD.MM.YYYY');
      // Update the input value with the formatted date
      (event.targetElement as any).value = formattedDate;
    }
  }
}
