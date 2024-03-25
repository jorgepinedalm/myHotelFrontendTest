import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { DeleteTasks } from 'src/app/actions/app.actions';

@Component({
  selector: 'app-task-delete',
  templateUrl: './task-delete.component.html',
  styleUrls: ['./task-delete.component.scss']
})
export class TaskDeleteComponent {

  idTask:number;
  titleTask:string;

  constructor(
    private store:Store,
    private dialogRef: MatDialogRef<TaskDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ){
    this.idTask = data.dataKey;
    this.titleTask = data.titleTask;
  }

  removeTask(): void {
    this.dialogRef.close(true);
    this.store.dispatch(new DeleteTasks(this.idTask));
  }
}
