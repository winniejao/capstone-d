import { Component, OnInit, Input, ViewChild } from '@angular/core'; import { SearchResult } from '../search-result';
import { DashService } from '../dash.service';
import { ArrayResponse } from '../master-service';
import { Form, FORM_HEADERS_ABR } from '../form';
import { MatTableModule, MatTableDataSource, MatSort, MatPaginator } from '@angular/material/';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { PassServiceService } from '../pass-service.service';
import { AdditemformComponent } from '../additemform/additemform.component';

@Component({
  selector: 'app-tabular',
  templateUrl: './tabular.component.html',
  styleUrls: ['./tabular.component.css']
})
export class TabularComponent implements OnInit {
  cat: string;
  subcat: string;
  table_details: Form[];
  full_details: Form[];
  table_columns: string[] = FORM_HEADERS_ABR;
  items: string[];
  dataSource: MatTableDataSource<Form>;
  pageSize = 10;
  pageSizeOptions: number[] = [10, 20, 30, 40, 50];
  num_results: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  passCat: string;
  passSubcat: string;

  constructor(
    private service: DashService,
    private pService: PassServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) { }

  resetFilter(): void {
    this.table_details = this.full_details;
    this.dataSource = new MatTableDataSource(this.table_details);
  }
  filterSelection(input: string): void {
    this.table_details = this.full_details.filter(x => x.name == input);
    this.dataSource = new MatTableDataSource(this.table_details);
  }

  ngOnInit() {
    this.cat = this.route.snapshot.paramMap.get('cat');
    this.subcat = this.route.snapshot.paramMap.get('subcat');
    this.service.getAllForms(this.cat, this.subcat).subscribe( (res: ArrayResponse) => {
      //The data is in res[0]
      //The return code is in res[1]
      var forms = res[0];
      this.table_details = forms;
      this.full_details = forms;
      this.items = Array.from(new Set(forms.map(single => single.name)));
      this.num_results = this.table_details.length;
      // Need to decide how to pass search terms
      this.dataSource = new MatTableDataSource(this.table_details);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  
  passData(cat,sub){
   this.pService.setData(cat,sub);
  }
 

}
