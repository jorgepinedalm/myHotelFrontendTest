import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AppState } from '../states/app.state';
import { GetBooks } from '../actions/app.actions';
import { Book } from '../models/book';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { BookDetailComponent } from './book-detail/book-detail.component';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit, AfterViewInit {
  books: Book[];
  displayedColumns: string[] = [];
  dataSource: MatTableDataSource<Book>;
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  @Select(AppState.selectStateData) bookInfo$?: Observable<any>;

  constructor(
    private store: Store,
    public dialog: MatDialog
  ){
    this.books = [];
    this.displayedColumns = ['title', 'authors', 'publicationDate', 'rating', 'actions'];
    this.dataSource = new MatTableDataSource(this.books);
  }
  
  ngOnInit(): void {
    this.getBooks();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = <MatPaginator>this.paginator;
    this.dataSource.sort = <MatSort>this.sort;
  }

  getBooks(): void{
    this.store.dispatch(new GetBooks());
    this.bookInfo$?.subscribe((returnData) => {
      this.books = returnData;
      this.dataSource.data = this.books;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openBookDetail(id:number) {
    const dialogRef = this.dialog.open(BookDetailComponent,
      {
        data: {
          dataKey: id
        }
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
