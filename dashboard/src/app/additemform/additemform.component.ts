import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ItemfieldsService } from '../itemfields.service';
import { DashService } from '../dash.service';
import { Form } from '../form';
import { ActivatedRoute } from '@angular/router';
import { PassServiceService } from '../pass-service.service';

@Component({
  selector: 'app-additemform',
  templateUrl: './additemform.component.html',
  styleUrls: ['./additemform.component.css']
})

export class AdditemformComponent implements OnInit {
  form: Form;
  id: number;

  constructor(
	private location: Location, 
	private iService: ItemfieldsService,
  private dService: DashService,
  private pService: PassServiceService,
  private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.stringToNum(this.route.snapshot.paramMap.get('id'));
  }

  alertCancel() {
    this.location.back();
  }

  passData(cat, sub, name, item, purpose, cost, serial, date, from,  every, note, attach) {
    this.iService.setData(cat, sub,name, item, purpose,cost,serial,date, from,every,note,attach);
    this.form={form_id:this.id, category:cat, subcat:sub, name:name, item:item, purpose:purpose, cost:cost, serial:serial, date:date, maint_date:from, repeat:every, attach:attach, notes:note};
    // form_id????????
    
    this.dService.addForm(this.form);
  }

  stringToNum(str: any): number {
    return str*1;
  }
}
