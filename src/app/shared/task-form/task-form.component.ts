import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GetCategories, GetPriorities } from 'src/app/actions/data.actions';
import { DataList } from 'src/app/models/data-list.model';
import { DataState } from 'src/app/states/data.state';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { FormValues } from 'src/app/models/form-values.model';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit, OnChanges {
  @Input()
  public initialState?: { [key: string]: any };
  @Output()
  formValuesChanged = new EventEmitter<FormValues>();
  form: FormGroup;
  isEditing:boolean;
  persons:string[];
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  @Select(DataState.selectStateCategories) categories$?: Observable<DataList[]>;
  @Select(DataState.selectStatePriorities) priorities$?: Observable<DataList[]>;
  private priorities:DataList[];
  
  
  constructor(
    private fb: FormBuilder,
    private store: Store
  ){
    this.form = this.createForm();
    this.priorities = [];
    this.persons = [];
    this.isEditing = false;
  }

  ngOnInit(): void {
    this.store.dispatch(new GetCategories());
    this.store.dispatch(new GetPriorities());
    this.priorities$?.subscribe(priorities => {
      this.priorities = priorities;
    })
    this.subscribeFormChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['initialState']){
      const initialState = changes['initialState']['currentValue'];
      this.form.patchValue({...initialState, priority: initialState.priority.value});
      this.persons = initialState.withWho ?? [];
      this.isEditing = true;
    }
  }

  createForm():FormGroup{
    return this.fb.group({
      title: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      description: new FormControl('', [Validators.maxLength(500)]),
      category: new FormControl('', [Validators.required]),
      priority: new FormControl('', [Validators.required]),
      where: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      when: new FormControl(new Date(), [Validators.required]),
      isDone: new FormControl('')
    });
  }

  subscribeFormChanges():void{
    this.form.valueChanges.subscribe((val) => {
      this.emitDataChanges(val);
    });
  }

  emitDataChanges(dataRawForm:any):void{
    dataRawForm.priority = this.priorities.find(priority => priority.value == dataRawForm.priority);
    dataRawForm.withWho = this.persons;
    this.formValuesChanged.emit({task:dataRawForm ,isValidForm: this.form.valid});
  }

  //add person in field with who
  add(event: any): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.persons.push(value);
      this.setPersonsInFormValue();
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  //remove person in field with who
  remove(person: string): void {
    const index = this.persons.indexOf(person);

    if (index >= 0) {
      this.persons.splice(index, 1);
      this.setPersonsInFormValue();
    }
  }

  //edit person in field with who
  edit(person: string, event: any) {
    const value = event.value.trim();

    // Remove fruit if it no longer has a name
    if (!value) {
      this.remove(person);
      return;
    }

    // Edit existing fruit
    const index = this.persons.indexOf(person);
    if (index >= 0) {
      this.persons[index] = value;
      this.setPersonsInFormValue();
    }
  }

  setPersonsInFormValue():void{
    const dataForm = this.form.getRawValue();
    this.emitDataChanges(dataForm);
  }
}
