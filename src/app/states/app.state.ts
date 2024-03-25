import { Injectable } from "@angular/core";
import { State, Selector, Action, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { TasksService } from "../services/tasks.service";
import { AddTasks, DeleteTasks, GetTaskById, GetTasks, UpdateTasks } from "../actions/app.actions";
import { Task } from "../models/task";

export class TaskStateModel {
    tasks: Task[]
    selectedTask?: Task;
    constructor(){
        this.tasks = [];
    }
}

@State<TaskStateModel>({
    name: 'appstate',
    defaults: {
        tasks: [],
        selectedTask: undefined
    }
})

@Injectable()
export class AppState {
    constructor(private taskService: TasksService) { }

    @Selector()
    static selectStateData(state:TaskStateModel){
        return state.tasks;
    }

    @Selector()
    static selectSelectedTask(state: TaskStateModel) {
        return state.selectedTask;
    }

    @Action(GetTasks)
    getDataFromState(ctx: StateContext<TaskStateModel>) {
        return this.taskService.fetchTasks().pipe(tap(returnData => {
            const state = ctx.getState();

            ctx.setState({
                ...state,
                tasks: returnData //here the data coming from the API will get assigned to the users variable inside the appstate
            })
        }))
    }

    @Action(GetTaskById)
    getTaskById(ctx: StateContext<TaskStateModel>, { id }: GetTaskById) {
        return this.taskService.getTaskById(id).pipe(tap(returnData => {
            const state = ctx.getState();
            const task = state.tasks.find(task => task.idTask === id);
            if (task) {
                // Actualiza el estado solo si se encuentra el libro con el ID dado
                ctx.patchState({
                    ...state,
                    selectedTask: task
                });
            }
        }));
    }

    @Action(AddTasks)
    addDataToState(ctx: StateContext<TaskStateModel>, { payload }: AddTasks) {
        return this.taskService.addTasks(payload).pipe(tap(returnData => {
            const state=ctx.getState();
            ctx.patchState({
                tasks:[...state.tasks, returnData]
            })
        }))
    }

    @Action(UpdateTasks)
    updateDataOfState(ctx: StateContext<TaskStateModel>, { payload, id}: UpdateTasks) {
        return this.taskService.updateTask(payload, id).pipe(tap(returnData => {
            const state=ctx.getState();

            const taskList = [...state.tasks];
            const taskIndex = taskList.findIndex(task => task.idTask === id);
            taskList[taskIndex] = payload;

            ctx.setState({
                ...state,
                tasks: taskList,
            });
        }))
    }

    @Action(DeleteTasks)
    deleteDataFromState(ctx: StateContext<TaskStateModel>, { id }: DeleteTasks) {
        return this.taskService.deleteTask(id).pipe(tap(returnData => {
            const state=ctx.getState();
            console.log("The is is",id)
            //Here we will create a new Array called filteredArray which won't contain the given id and set it equal to state.todo
            const filteredArray=state.tasks.filter((contents:any)=>contents.id!==id);

            ctx.setState({
                ...state,
                tasks:filteredArray
            })
        }))
    }
}