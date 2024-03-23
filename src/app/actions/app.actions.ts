//Read
export class GetSongs {
    static readonly type = '[Songs] Fetch';
}

//Create
export class AddSongs {
    static readonly type = '[Songs] Add';
    constructor(public payload: any) { }
}

//Update
export class UpdateSongs {
    static readonly type = '[Songs] Update';
    constructor(public payload: any, public id: number, public i:number) { }
}

//Delete
export class DeleteSongs {
    static readonly type = '[Songs] Delete';
    constructor(public id: number) { }
}