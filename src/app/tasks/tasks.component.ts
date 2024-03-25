import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AppState } from '../states/app.state';
import { DeleteTasks, GetTasks } from '../actions/app.actions';
import { Task } from '../models/task';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { PriorityTask } from '../enums/priority-task';
import { TaskEditComponent } from './task-edit/task-edit.component';
import { TaskCreateComponent } from './task-create/task-create.component';
import { TaskDeleteComponent } from './task-delete/task-delete.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmpFilter } from '../models/emp-filter.model';
import { DataList } from '../models/data-list.model';
import { DataState } from '../states/data.state';
import { GetCategories, GetPriorities } from '../actions/data.actions';
import { PriorityTask as PriorityTaskModel } from "../models/priority-task.model";

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
  priorityTask: typeof PriorityTask;
  empFilters: EmpFilter[];
  toggleFilterPanel:boolean;
  hideFilterBadge:boolean;
  
  defaultValue:string;

  filterDictionary: Map<string,string>;

  @Select(AppState.selectStateData) bookInfo$?: Observable<Task[]>;
  @Select(DataState.selectStateCategories) categories$?: Observable<DataList[]>;
  @Select(DataState.selectStatePriorities) priorities$?: Observable<DataList[]>;

  constructor(
    private store: Store,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ){
    this.tasks = [];
    this.displayedColumns = ['title', 'category', 'when', 'priority.id', 'isDone', 'actions'];
    this.dataSource = new MatTableDataSource(this.tasks);
    this.priorityTask = PriorityTask;
    this.empFilters = [];
    this.defaultValue = "All";
    this.filterDictionary = new Map<string,string>();
    this.toggleFilterPanel = false;
    this.hideFilterBadge = true; 
  }
  
  ngOnInit(): void {
    this.getTasks();
    
    this.setCategoriesinFilters();
    this.setPrioritiesinFilters();
  }

  setCategoriesinFilters():void{
    this.store.dispatch(new GetCategories());
    this.categories$?.subscribe(categories => {
      const options = categories.map(category => category.value);
      options.unshift("All");
      this.empFilters.push({name:'category',options:options,defaultValue:this.defaultValue});
    })
  }

  setPrioritiesinFilters():void{
    this.store.dispatch(new GetPriorities());
    this.priorities$?.subscribe(priorities => {
      const options = priorities.map(priority => priority.value);
      options.unshift("All");
      this.empFilters.push({name:'priority',options:options,defaultValue:this.defaultValue});
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = <MatPaginator>this.paginator;
    this.dataSource.sortingDataAccessor = (obj, property) => this.getProperty(obj, property);
    this.dataSource.sort = <MatSort>this.sort;
    this.dataSource.filterPredicate = (record:Task, filter:string)  => this.setFilterPredicateToDataSource(record, filter);
  }

  setFilterPredicateToDataSource(record:Task, filter:string): boolean{
    const map = new Map(JSON.parse(filter));
    let isMatch = false;
    
    for(let [key,value] of map){
      let recordContainsValue = false;
      if(key == "all") recordContainsValue = this.checkBasicFilter(record, value as string);
      const recordHasPriority = key == "priority" ? (record[key as keyof Task] as PriorityTaskModel).value == value : false;
      isMatch = ((value=="All") || (record[key as keyof Task] == value) || recordContainsValue || recordHasPriority); 
      this.toggleFilterBadge(key as string, value as string);
      
      if(!isMatch) return false;
    }
    return isMatch;
  }

  /**
   * Return if the filter value is contained in some string props in the records
   * @param record record in the list
   * @param value filter value
   * @returns if record in the strings props contains value, return true, otherwise return false.
   */
  checkBasicFilter(record:Task, value:string):boolean{
    let recordContainsValue = false;
    for(const r in record){
      const valueRecord = record[r as keyof Task];
      if(valueRecord && typeof valueRecord == "string" && valueRecord.indexOf(value) > -1){
        recordContainsValue = true;
        break;
      }
    }
    return recordContainsValue;
  }

  toggleFilterBadge(key:string, value:string):void{
    this.hideFilterBadge = (key == "priority" || key == "category") && (value == "All" || value == "");
  }

  applyEmpFilter(ob:any,empfilter:EmpFilter) {

    this.filterDictionary.set(empfilter.name,ob.value);
    const jsonString = JSON.stringify(Array.from(this.filterDictionary.entries()));
    this.dataSource.filter = jsonString;

    this.goToFirstPage();
  }

  getProperty = (obj:any, path:any) => (
    path.split('.').reduce((o:any, p:any) => o && o[p], obj)
  )

  getTasks(): void{
    this.store.dispatch(new GetTasks());
    this.bookInfo$?.subscribe((returnData) => {
      this.tasks = returnData;
      this.dataSource.data = this.tasks;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterDictionary.set("all",filterValue);
    var jsonString = JSON.stringify(Array.from(this.filterDictionary.entries()));
    this.dataSource.filter = jsonString;

    this.goToFirstPage();
  }

  goToFirstPage():void{
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openTaskDetail(id:number) {
    const dialogRef = this.dialog.open(TaskDetailComponent,
      {
        data: {
          dataKey: id
        }
      });
  }

  openTaskEdit(id:number) {
    const dialogRef = this.dialog.open(TaskEditComponent,
      {
        data: {
          dataKey: id
        }
      });

    dialogRef.afterClosed().subscribe(result => {
      if(result) this.snackBar.open("The task has been modified successfully", undefined, {duration: 4000});
    });
  }

  openCreateEdit() {
    const dialogRef = this.dialog.open(TaskCreateComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result) this.snackBar.open("The task has been added successfully", undefined, {duration: 4000});
    });
  }

  openRemoveTask(task:Task):void{
    const dialogRef = this.dialog.open(TaskDeleteComponent,
      {
        data: {
          dataKey: task.idTask,
          titleTask: task.title
        }
      });

    dialogRef.afterClosed().subscribe(result => {
      if(result) this.snackBar.open("The task has been removed successfully", undefined, {duration: 4000});
    });
    
  }

}
