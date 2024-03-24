import { Task } from "../models/task";

//Read
export class GetTasks {
    static readonly type = '[Tasks] Fetch';
}

// Get a single book
export class GetTaskById {
    static readonly type = '[Tasks] Get by ID';
    constructor(public id: number) { }
}

//Create
export class AddTasks {
    static readonly type = '[Tasks] Add';
    constructor(public payload: Task) { }
}

//Update
export class UpdateTasks {
    static readonly type = '[Tasks] Update';
    constructor(public payload: Task, public id: number, public i:number) { }
}

//Delete
export class DeleteTasks {
    static readonly type = '[Tasks] Delete';
    constructor(public id: number) { }
}