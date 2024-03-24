import { Component } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as moment from 'moment';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss']
})
export class TaskEditComponent {

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
