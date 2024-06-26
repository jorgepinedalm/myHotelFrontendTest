import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksComponent } from './tasks.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { TaskCreateComponent } from './task-create/task-create.component';
import { TasksRoutingModule } from './tasks-routing.module';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatChipsModule} from '@angular/material/chips';
import { SharedModule } from '../shared/shared.module';
import { TaskEditComponent } from './task-edit/task-edit.component';
import { TaskDeleteComponent } from './task-delete/task-delete.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatBadgeModule} from '@angular/material/badge';

@NgModule({
  declarations: [
    TasksComponent,
    TaskDetailComponent,
    TaskCreateComponent,
    TaskEditComponent,
    TaskDeleteComponent
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatChipsModule,
    MatSnackBarModule,
    MatSelectModule,
    MatExpansionModule,
    MatBadgeModule,
    SharedModule
  ]
})
export class TasksModule { }
