import { Component, OnInit } from '@angular/core';
import { DashService } from '../dash.service';
import { map, tap } from '../../../node_modules/rxjs/operators';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor(private service: DashService) { }
  result: String;
   test(): void {  
     this.service.getTest().subscribe(asd => this.result = asd);
    }

  ngOnInit() {
  }

}
