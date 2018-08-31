import { Component, OnInit } from '@angular/core';
import { ItemfieldsService } from '../itemfields.service';
import { Location } from '@angular/common';
import { DashService } from '../dash.service';
import { Form } from '../form';

@Component({
  selector: 'app-viewitemform',
  templateUrl: './viewitemform.component.html',
  styleUrls: ['./viewitemform.component.css']
})
export class ViewitemformComponent implements OnInit {
  table_details: Form

  constructor(private iService: ItemfieldsService, private location: Location, private dService: DashService) { }

  ngOnInit() {
  }

  editData(){
    this.location.back();    
  }


  passData(id, cat, sub, name, item, purpose, cost, serial, date, from,  every, note, attach) {
    this.iService.setData( cat, sub,name, item, purpose,cost,serial,date, from,every,note,attach);
    this.table_details={form_id:id, category:cat, subcat:sub, name:name, item:item, purpose:purpose, cost:cost, serial:serial, date:date, maint_date:from, repeat:every, attach:attach, notes:note};
    this.dService.addForm(this.table_details);
  }

  deleteData(id, cat, sub, name, item, purpose, cost, serial, date, from,  every,  note, attach) {
    this.iService.setData( cat, sub,name, item, purpose,cost,serial,date, from,every,note,attach);
    this.table_details={form_id:id, category:cat, subcat:sub, name:name, item:item, purpose:purpose, cost:cost, serial:serial, date:date, maint_date:from, repeat:every, attach:attach, notes:note};
    this.dService.deleteForm(this.table_details);
  }
}
