import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HowLongAgoWasTheDatePipe } from '../pipes/how-long-ago-was-the-date.pipe';



@NgModule({
  declarations: [
    HowLongAgoWasTheDatePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HowLongAgoWasTheDatePipe
  ]
})
export class SharedModule { }
