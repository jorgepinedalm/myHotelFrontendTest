import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AppState } from '../states/app.state';
import { GetTasks } from '../actions/app.actions';
import { Task } from '../models/task';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { TaskDetailComponent } from './task-detail/task-detail.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit, AfterViewInit {
  tasks: Task[];
  displayedColumns: string[] = [];
  dataSource: MatTableDataSource<Task>;
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  @Select(AppState.selectStateData) bookInfo$?: Observable<any>;

  constructor(
    private store: Store,
    public dialog: MatDialog
  ){
    this.tasks = [];
    this.displayedColumns = ['title', 'category', 'when', 'priority', 'actions'];
    this.dataSource = new MatTableDataSource(this.tasks);
  }
  
  ngOnInit(): void {
    this.getTasks();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = <MatPaginator>this.paginator;
    this.dataSource.sort = <MatSort>this.sort;
  }

  getTasks(): void{
    this.store.dispatch(new GetTasks());
    this.bookInfo$?.subscribe((returnData) => {
      this.tasks = returnData;
      this.dataSource.data = this.tasks;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openTaskDetail(id:number) {
    const dialogRef = this.dialog.open(TaskDetailComponent,
      {
        minWidth: "50vw",
        data: {
          dataKey: id
        }
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
