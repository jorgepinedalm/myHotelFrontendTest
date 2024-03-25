import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HowLongAgoWasTheDatePipe } from '../pipes/how-long-ago-was-the-date.pipe';
import { TaskFormComponent } from './task-form/task-form.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import {MatButtonToggleModule} from '@angular/material/button-toggle';


@NgModule({
  declarations: [
    HowLongAgoWasTheDatePipe,
    TaskFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatButtonToggleModule
  ],
  exports: [
    HowLongAgoWasTheDatePipe,
    TaskFormComponent
  ]
})
export class SharedModule { }
