export interface Task {
    idTask: number;
    cover?:String;
    title: string;
    abstract?: string;
    authors: string[];
    publicationDate?: Date;
    visible: boolean;
    rating: number;
}
