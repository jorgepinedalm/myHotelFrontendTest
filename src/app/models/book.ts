export interface Book {
    idBook: number;
    cover?:String;
    title: string;
    abstract?: string;
    authors: string[];
    publicationDate?: Date;
    visible: boolean;
    rating: number;
}
