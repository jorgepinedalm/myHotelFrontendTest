import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { AddTasks } from 'src/app/actions/app.actions';
import { Task } from "../../models/task";
import { MatDialogRef } from '@angular/material/dialog';
import { FormValues } from 'src/app/models/form-values.model';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss']
})
export class TaskCreateComponent {

  dataForm?:Task;
  isValidForm:boolean;

  constructor(
    private store: Store,
    private dialogRef: MatDialogRef<TaskCreateComponent>
  ){
    this.isValidForm = false;
  }

  linkFormData(data:FormValues):void{
    this.dataForm = data.task;
    this.isValidForm = data.isValidForm;
  }

  createTask(): void {
    if(this.isValidForm){
      this.dialogRef.close(true);
      this.store.dispatch(new AddTasks(this.dataForm as Task));
    }
    
  }
}
