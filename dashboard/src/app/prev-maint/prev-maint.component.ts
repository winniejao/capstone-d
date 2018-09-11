import { Component, OnInit } from '@angular/core';
import { DashService } from '../dash.service';
import { ActivatedRoute } from '@angular/router';
import { PMResponse, PMForm } from '../master-service';

@Component({
  selector: 'app-prev-maint',
  templateUrl: './prev-maint.component.html',
  styleUrls: ['./prev-maint.component.css']
})
export class PrevMaintComponent implements OnInit {
  theTable: PMForm[];

  //private route: ActivatedRoute,
  constructor(
    private service: DashService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    var cat = this.route.snapshot.paramMap.get('cat');
    var subcat = this.route.snapshot.paramMap.get('subcat');
    this.service.getPM(cat, subcat).subscribe( (res: PMResponse) => {
      //The data is in res[0]
      //The return code is in res[1]
      var forms = res[0];
      this.theTable = forms;
      // Need to decide how to pass search terms

    });
  }

}
