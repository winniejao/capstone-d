import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { SearchResult } from '../search-result';
import { DummyService } from '../dummy.service';
// TODO: use real service
import { Form, FORM_HEADERS } from '../form';
import { MatTableModule, MatTableDataSource, MatSort, MatPaginator } from '@angular/material/';
import { ActivatedRoute } from '@angular/router';
import { MOCK_FORMS } from '../mock_forms';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  search_term: string;
  table_details: Form[];
  table_columns: string[] = FORM_HEADERS;
  dataSource: MatTableDataSource<Form>;
  pageSize = 1;
  pageSizeOptions: number[] = [1, 2, 3, 4, 5];
  num_results: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private dummyService: DummyService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.search_term = this.route.snapshot.paramMap.get('search_term');
    this.dummyService.querySearch(this.search_term).subscribe(table_details => this.table_details = table_details);
    this.num_results = this.table_details.length;
    // Need to decide how to pass search terms
    this.dataSource = new MatTableDataSource(this.table_details);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }
}
