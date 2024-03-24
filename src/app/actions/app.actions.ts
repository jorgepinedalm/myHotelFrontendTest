import { Book } from "../models/book";

//Read
export class GetBooks {
    static readonly type = '[Books] Fetch';
}

// Get a single book
export class GetBookById {
    static readonly type = '[Books] Get by ID';
    constructor(public id: number) { }
}

//Create
export class AddBooks {
    static readonly type = '[Books] Add';
    constructor(public payload: Book) { }
}

//Update
export class UpdateBooks {
    static readonly type = '[Books] Update';
    constructor(public payload: Book, public id: number, public i:number) { }
}

//Delete
export class DeleteBooks {
    static readonly type = '[Books] Delete';
    constructor(public id: number) { }
}