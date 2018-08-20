import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { SearchResult } from '../search-result';
import { DummyService } from '../dummy.service';
// TODO: use real service
import { Form, FORM_HEADERS } from '../form';
import { MatTableModule, MatTableDataSource, MatSort, MatPaginator } from '@angular/material/';
import { Router, ActivatedRoute } from '@angular/router';
import { MOCK_FORMS } from '../mock_forms';


@Component({
  selector: 'app-tabular',
  templateUrl: './tabular.component.html',
  styleUrls: ['./tabular.component.css']
})
export class TabularComponent implements OnInit {
  cat: string;
  subcat: string;
  table_details: Form[];
  table_columns: string[] = FORM_HEADERS;
  items: string[];
  dataSource: MatTableDataSource<Form>;
  pageSize = 1;
  pageSizeOptions: number[] = [1, 2, 3, 4, 5];
  num_results: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private dummyService: DummyService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.cat = this.route.snapshot.paramMap.get('cat');
    this.subcat = this.route.snapshot.paramMap.get('subcat');
    this.dummyService.getDetails(this.cat, this.subcat).subscribe(table_details => this.table_details = table_details);
    this.dummyService.getItems(this.cat, this.subcat).subscribe(items => this.items = items);
    this.num_results = this.table_details.length;
    // Need to decide how to pass search terms
    this.dataSource = new MatTableDataSource(this.table_details);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    
  }
  
}
