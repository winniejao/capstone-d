import { Component, OnInit, Input } from '@angular/core';
import { SearchResult } from '../search-result';
import { DummyService } from '../dummy.service';
// TODO: use real service

@Component({
  selector: 'app-tabular',
  templateUrl: './tabular.component.html',
  styleUrls: ['./tabular.component.css']
})
export class TabularComponent implements OnInit {
  @Input() search = "test";
  table_details: any[];
  table_columns: string[];
  subcat: SearchResult[];

  constructor(private dummyService: DummyService) { }

  ngOnInit() {
    this.dummyService.getDetails(this.search).subscribe(table_details => this.table_details = table_details);
    this.dummyService.getColumns(this.search).subscribe(table_columns => this.table_columns = table_columns);
    this.dummyService.getSubcat(this.search).subscribe(subcat => this.subcat = subcat);
    // Need to decide how to pass search terms
  }
  
}
