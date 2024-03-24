import { Injectable } from "@angular/core";
import { State, Selector, Action, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { TasksService } from "../services/tasks.service";
import { AddTasks, DeleteTasks, GetTaskById, GetTasks, UpdateTasks } from "../actions/app.actions";
import { Task } from "../models/task";

export class TaskStateModel {
    books: Task[]
    selectedTask?: Task;
    constructor(){
        this.books = [];
    }
}

@State<TaskStateModel>({
    name: 'appstate',
    defaults: {
        books: [],
        selectedTask: undefined
    }
})

@Injectable()
export class AppState {
    constructor(private bookService: TasksService) { }

    @Selector()
    static selectStateData(state:TaskStateModel){
        return state.books;
    }

    @Selector()
    static selectSelectedTask(state: TaskStateModel) {
        return state.selectedTask;
    }

    @Action(GetTasks)
    getDataFromState(ctx: StateContext<TaskStateModel>) {
        return this.bookService.fetchTasks().pipe(tap(returnData => {
            const state = ctx.getState();

            ctx.setState({
                ...state,
                books: returnData //here the data coming from the API will get assigned to the users variable inside the appstate
            })
        }))
    }

    @Action(GetTaskById)
    getTaskById(ctx: StateContext<TaskStateModel>, { id }: GetTaskById) {
        return this.bookService.getTaskById(id).pipe(tap(returnData => {
            const state = ctx.getState();
            const book = state.books.find(book => book.idTask === id);
            if (book) {
                // Actualiza el estado solo si se encuentra el libro con el ID dado
                ctx.patchState({
                    ...state,
                    selectedTask: book
                });
            }
        }));
    }

    @Action(AddTasks)
    addDataToState(ctx: StateContext<TaskStateModel>, { payload }: AddTasks) {
        return this.bookService.addTasks(payload).pipe(tap(returnData => {
            const state=ctx.getState();
            ctx.patchState({
                books:[...state.books,returnData]
            })
        }))
    }

    @Action(UpdateTasks)
    updateDataOfState(ctx: StateContext<TaskStateModel>, { payload, id, i }: UpdateTasks) {
        return this.bookService.updateTask(payload, i).pipe(tap(returnData => {
            const state=ctx.getState();

            const userList = [...state.books];
            userList[i]=payload;

            ctx.setState({
                ...state,
                books: userList,
            });
        }))
    }

    @Action(DeleteTasks)
    deleteDataFromState(ctx: StateContext<TaskStateModel>, { id }: DeleteTasks) {
        return this.bookService.deleteTask(id).pipe(tap(returnData => {
            const state=ctx.getState();
            console.log("The is is",id)
            //Here we will create a new Array called filteredArray which won't contain the given id and set it equal to state.todo
            const filteredArray=state.books.filter((contents:any)=>contents.id!==id);

            ctx.setState({
                ...state,
                books:filteredArray
            })
        }))
    }
}