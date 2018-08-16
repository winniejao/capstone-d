import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { SearchResult } from '../search-result';
import { DummyService } from '../dummy.service';
// TODO: use real service
import { Form } from '../form';
import { MatTableModule, MatTableDataSource, MatSort, MatPaginator } from '@angular/material/';
import { MOCK_FORMS } from '../mock_forms';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  @Input() search = "test";
  table_details: Form[];
  table_columns: string[];
  items: SearchResult[];
  dataSource: MatTableDataSource<Form>;
  pageSize = 1;
  pageSizeOptions: number[] = [1, 2, 3, 4, 5];
  num_results: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dummyService: DummyService) { }

  ngOnInit() {
    this.dummyService.getDetails(this.search).subscribe(table_details => this.table_details = table_details);
    this.dummyService.getColumns(this.search).subscribe(table_columns => this.table_columns = table_columns);
    this.dummyService.getItems(this.search).subscribe(items => this.items = items);
    this.dummyService.getNum(this.search).subscribe(num_results => this.num_results = num_results);
    // Need to decide how to pass search terms
    this.dataSource = new MatTableDataSource(this.table_details);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }
}
