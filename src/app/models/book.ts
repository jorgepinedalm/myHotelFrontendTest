export interface Book {
    idBook: number;
    title: string;
    abstract?: string;
    authors: string[];
    publicationDate?: string;
    visible: boolean;
    rating: number;
}
