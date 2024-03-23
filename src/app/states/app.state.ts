import { Injectable } from "@angular/core";
import { State, Selector, Action, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { BooksService } from "../services/books.service";
import { AddBooks, DeleteBooks, GetBooks, UpdateBooks } from "../actions/app.actions";

export class BookStateModel {
    songs: any
}

@State<BookStateModel>({
    name: 'appstate',
    defaults: {
        songs: []
    }
})

@Injectable()
export class AppState {
    constructor(private songService: BooksService) { }

    @Selector()
    static selectStateData(state:BookStateModel){
        return state.songs;
    }

    @Action(GetBooks)
    getDataFromState(ctx: StateContext<BookStateModel>) {
        return this.songService.fetchBooks().pipe(tap(returnData => {
            const state = ctx.getState();

            ctx.setState({
                ...state,
                songs: returnData //here the data coming from the API will get assigned to the users variable inside the appstate
            })
        }))
    }

    @Action(AddBooks)
    addDataToState(ctx: StateContext<BookStateModel>, { payload }: AddBooks) {
        return this.songService.addBooks(payload).pipe(tap(returnData => {
            const state=ctx.getState();
            ctx.patchState({
                songs:[...state.songs,returnData]
            })
        }))
    }

    @Action(UpdateBooks)
    updateDataOfState(ctx: StateContext<BookStateModel>, { payload, id, i }: UpdateBooks) {
        return this.songService.updateBook(payload, i).pipe(tap(returnData => {
            const state=ctx.getState();

            const userList = [...state.songs];
            userList[i]=payload;

            ctx.setState({
                ...state,
                songs: userList,
            });
        }))
    }

    @Action(DeleteBooks)
    deleteDataFromState(ctx: StateContext<BookStateModel>, { id }: DeleteBooks) {
        return this.songService.deleteBook(id).pipe(tap(returnData => {
            const state=ctx.getState();
            console.log("The is is",id)
            //Here we will create a new Array called filteredArray which won't contain the given id and set it equal to state.todo
            const filteredArray=state.songs.filter((contents:any)=>contents.id!==id);

            ctx.setState({
                ...state,
                songs:filteredArray
            })
        }))
    }
}