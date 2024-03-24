export interface Book {
    idBook: number;
    title: string;
    abstract?: string;
    authors: string[];
    publicationDate?: Date;
    visible: boolean;
    rating: number;
}
