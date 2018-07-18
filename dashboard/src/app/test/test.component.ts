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
   testWeb(): void {  
     this.service.getTestWeb().subscribe(val => this.result = val);
    }

    testPython(): void {
      this.service.getTestPython().subscribe(val => this.result = val);
    }

  ngOnInit() {
  }

}
