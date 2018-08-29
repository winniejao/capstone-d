import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ItemfieldsService } from '../itemfields.service';
import { PassServiceService } from '../pass-service.service';
import { DashService } from '../dash.service';
import { Form } from '../form';

@Component({
  selector: 'app-additemform',
  templateUrl: './additemform.component.html',
  styleUrls: ['./additemform.component.css']
})
export class AdditemformComponent implements OnInit {

  table_details: Form
  constructor(
	private location: Location, 
	private iService: ItemfieldsService,
	public pService: PassServiceService,
	private dService: DashService
  ) { }

  ngOnInit() {
  }

  alertCancel() {
    this.location.back();
  }

  passData(id, cat, sub, name, item, purpose, cost, serial, date, from,  every, dwm, note, attach) {
    this.iService.setData(id, cat, sub,name, item, purpose,cost,serial,date, from,every,dwm,note,attach);
    this.table_details={form_id:id, category:cat, subcat:sub, name:name, item:item, purpose:purpose, cost:cost, serial:serial, date:date, maint_date:from, repeat:every, attach:attach, notes:note};

    this.dService.addForm(this.table_details).subscribe();
  }
  
}
