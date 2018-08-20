import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { SearchResult } from '../search-result';
import { DashService } from '../dash.service';
// TODO: use real service
import { Form, FORM_HEADERS } from '../form';
import { MatTableModule, MatTableDataSource, MatSort, MatPaginator } from '@angular/material/';
import { Router, ActivatedRoute } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
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
  pageSize = 10;
  pageSizeOptions: number[] = [10, 20, 30, 40, 50];
  num_results: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private service: DashService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.cat = this.route.snapshot.paramMap.get('cat');
    this.subcat = this.route.snapshot.paramMap.get('subcat');
    //this.dummyService.getDetails(this.cat, this.subcat).subscribe(table_details => this.table_details = table_details);
    //// When I get time I need to cache this result instead of double calling it, really bad right now
    this.service.getAllForms(this.cat, this.subcat).subscribe(forms => this.table_details = forms);
    console.log(this.table_details);
    //this.dummyService.getItems(this.cat, this.subcat).subscribe(items => this.items = items);
    this.service.getAllForms(this.cat, this.subcat).subscribe(forms => this.items = Array.from(new Set(forms.map(single => single.name))));
    this.num_results = this.table_details.length;
    // Need to decide how to pass search terms
    this.dataSource = new MatTableDataSource(this.table_details);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    
  }

}
