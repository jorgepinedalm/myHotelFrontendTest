import { Injectable } from "@angular/core";
import { State, Selector, Action, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { SongsService } from "../services/songs.service";
import { AddSongs, DeleteSongs, GetSongs, UpdateSongs } from "../actions/app.actions";

export class SongStateModel {
    songs: any
}

@State<SongStateModel>({
    name: 'appstate',
    defaults: {
        songs: []
    }
})

@Injectable()
export class AppState {
    constructor(private songService: SongsService) { }

    @Selector()
    static selectStateData(state:SongStateModel){
        return state.songs;
    }

    @Action(GetSongs)
    getDataFromState(ctx: StateContext<SongStateModel>) {
        return this.songService.fetchSongs().pipe(tap(returnData => {
            const state = ctx.getState();

            ctx.setState({
                ...state,
                songs: returnData //here the data coming from the API will get assigned to the users variable inside the appstate
            })
        }))
    }

    @Action(AddSongs)
    addDataToState(ctx: StateContext<SongStateModel>, { payload }: AddSongs) {
        return this.songService.addSongs(payload).pipe(tap(returnData => {
            const state=ctx.getState();
            ctx.patchState({
                songs:[...state.songs,returnData]
            })
        }))
    }

    @Action(UpdateSongs)
    updateDataOfState(ctx: StateContext<SongStateModel>, { payload, id, i }: UpdateSongs) {
        return this.songService.updateSong(payload, i).pipe(tap(returnData => {
            const state=ctx.getState();

            const userList = [...state.songs];
            userList[i]=payload;

            ctx.setState({
                ...state,
                songs: userList,
            });
        }))
    }

    @Action(DeleteSongs)
    deleteDataFromState(ctx: StateContext<SongStateModel>, { id }: DeleteSongs) {
        return this.songService.deleteSong(id).pipe(tap(returnData => {
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