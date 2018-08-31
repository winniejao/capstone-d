import { Component, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';
import { SearchResult } from '../search-result';
import { ArrayResponse } from '../master-service';
import { DashService } from '../dash.service';
import { Form, FORM_HEADERS_XREPEAT } from '../form';
import { MatTableModule, MatTableDataSource, MatSort, MatPaginator } from '@angular/material/';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { MOCK_FORMS } from '../mock_forms';

// For refresh on repeated search: https://medium.com/engineering-on-the-incline/reloading-current-route-on-click-angular-5-1a1bfc740ab2

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit, OnDestroy {
  search_term: string;
  table_details: Form[];
  table_columns: string[] = FORM_HEADERS_XREPEAT;
  dataSource: MatTableDataSource<Form>;
  pageSize = 10;
  pageSizeOptions: number[] = [10, 20, 30, 40, 50];
  num_results: number;
  navigationSubscription;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private service: DashService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    // subscribe to the router events - storing the subscription so
    // we can unsubscribe later.
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
      }
    });
  }

  initialiseInvites() {
    // Set default values and re-fetch any data you need.
    this.search_term = this.route.snapshot.paramMap.get('search_term');
    this.service.search(this.search_term).subscribe(table_details => {
      this.table_details = table_details;
      this.num_results = this.table_details.length;
      // Need to decide how to pass search terms
      this.dataSource = new MatTableDataSource(this.table_details);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngOnInit() {
    
  }

  ngOnDestroy() {
    // avoid memory leaks here by cleaning up after ourselves. If we  
    // don't then we will continue to run our initialiseInvites()   
    // method on every navigationEnd event.
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }
}
