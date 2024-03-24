import { Action, Selector, State, StateContext } from "@ngxs/store";
import { DataList } from "../models/data-list.model";
import { Injectable } from "@angular/core";
import { DataService } from "../services/data.service";
import { GetCategories, GetPriorities } from "../actions/data.actions";
import { tap } from "rxjs";

export class DataStateModel {
    categories: DataList[];
    priorities: DataList[];
    constructor(){
        this.categories = [];
        this.priorities = [];
    }
}

@State<DataStateModel>({
    name: 'datastate',
    defaults: {
        categories: [],
        priorities: []
    }
})

@Injectable()
export class DataState {
    constructor(private dataService: DataService) { }

    @Selector()
    static selectStateCategories(state:DataStateModel){
        return state.categories;
    }

    @Selector()
    static selectStatePriorities(state:DataStateModel){
        return state.priorities;
    }

    @Action(GetCategories)
    getCategoriesFromState(ctx: StateContext<DataStateModel>) {
        return this.dataService.getCategories().pipe(tap(returnData => {
            const state = ctx.getState();

            ctx.setState({
                ...state,
                categories: returnData
            })
        }))
    }

    @Action(GetPriorities)
    getPrioritiesFromState(ctx: StateContext<DataStateModel>) {
        return this.dataService.getPriorities().pipe(tap(returnData => {
            const state = ctx.getState();

            ctx.setState({
                ...state,
                priorities: returnData
            })
        }))
    }
}