import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GetTaskById } from 'src/app/actions/app.actions';
import { Task } from 'src/app/models/task';
import { AppState } from 'src/app/states/app.state';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent {
  @Select(AppState.selectSelectedTask) selectedTask$?: Observable<Task>;

  constructor(
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){
    const idTask = data.dataKey;
    this.store.dispatch(new GetTaskById(idTask));
  }
}
