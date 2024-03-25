import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { GetTaskById, UpdateTasks } from 'src/app/actions/app.actions';
import { AppState } from 'src/app/states/app.state';
import { Task } from "../../models/task";
import { FormValues } from 'src/app/models/form-values.model';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss']
})
export class TaskEditComponent {

  @Select(AppState.selectSelectedTask) selectedTask$?: Observable<Task>;
  initialState?:Task;
  dataForm?:Task;
  isValidForm:boolean;
  idTask:number;
  
  constructor(
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<TaskEditComponent>
  ){
    this.idTask = data.dataKey;
    this.store.dispatch(new GetTaskById(this.idTask));
    this.selectedTask$?.subscribe((task:Task) => {
      if(task) {
        this.initialState = {...task};
        this.dataForm = this.initialState;
      }
    })
    this.isValidForm = true;
  }

  linkFormData(data:FormValues):void{
    this.dataForm = data.task;
    this.isValidForm = data.isValidForm;
  }

  editTask(): void {
    if(this.isValidForm){
      this.dialogRef.close(true);
      this.store.dispatch(new UpdateTasks(this.dataForm as Task, this.idTask));
    }    
  }

  onDateInput(event: any) {
    if (event.value) {
      // Format the date manually
      const formattedDate = moment(event.value).format('DD.MM.YYYY');
      // Update the input value with the formatted date
      (event.targetElement as any).value = formattedDate;
    }
  }
}
