import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnChanges {
  @Input()
  public initialState?: { [key: string]: any };
  public form: FormGroup;

  constructor(
    private fb: FormBuilder
  ){
    this.form = this.createForm();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['initialState']){
      this.form.patchValue(changes['initialState']);
    }
  }

  createForm():FormGroup{
    return this.fb.group({
      title: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      description: new FormControl('', [Validators.maxLength(500)]),
      category: new FormControl('', [Validators.required]),
      priority: new FormControl('', [Validators.required]),
      where: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      when: new FormControl('', [Validators.required]),
    });
  }
}
