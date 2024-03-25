import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GetCategories, GetPriorities } from 'src/app/actions/data.actions';
import { DataList } from 'src/app/models/data-list.model';
import { DataState } from 'src/app/states/data.state';
import { Task } from "../../models/task";
import { FormValues } from 'src/app/models/form-values.model';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit, OnChanges {
  @Input()
  public initialState?: { [key: string]: any };
  @Output()
  public formValuesChanged = new EventEmitter<FormValues>();
  public form: FormGroup;
  @Select(DataState.selectStateCategories) categories$?: Observable<DataList[]>;
  @Select(DataState.selectStatePriorities) priorities$?: Observable<DataList[]>;
  private priorities:DataList[];

  constructor(
    private fb: FormBuilder,
    private store: Store
  ){
    this.form = this.createForm();
    this.priorities = [];
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

  subscribeFormChanges():void{
    this.form.valueChanges.subscribe((val) => {
      val.priority = this.priorities.find(priority => priority.value == val.priority);
      this.formValuesChanged.emit({task:val ,isValidForm: this.form.valid});
    });
  }
}
