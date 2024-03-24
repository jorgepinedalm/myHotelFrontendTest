import { PriorityTask } from "./priority-task.model";

export interface Task {
    idTask: number;
    title: string;
    description?: string;
    withWho?: string[];
    category:string;
    priority:PriorityTask;
    when: Date;
    where:string;
    isDone: boolean;
}
