import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GetCategories, GetPriorities } from 'src/app/actions/data.actions';
import { DataList } from 'src/app/models/data-list.model';
import { DataState } from 'src/app/states/data.state';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit, OnChanges {
  @Input()
  public initialState?: { [key: string]: any };
  public form: FormGroup;
  @Select(DataState.selectStateCategories) categories$?: Observable<DataList[]>;
  @Select(DataState.selectStatePriorities) priorities$?: Observable<DataList[]>;

  constructor(
    private fb: FormBuilder,
    private store: Store
  ){
    this.form = this.createForm();
  }
  
  ngOnInit(): void {
    this.store.dispatch(new GetCategories());
    this.store.dispatch(new GetPriorities());
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
