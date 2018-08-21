import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ItemfieldsService } from '../itemfields.service';
import { PassServiceService } from '../pass-service.service';
import { Form } from '../form'

@Component({
  selector: 'app-additemform',
  templateUrl: './additemform.component.html',
  styleUrls: ['./additemform.component.css']
})
export class AdditemformComponent implements OnInit {
  passID: string;
  passCat: string;
  passSubcat: string;
  passName: string;
  passPurpose: string;
  passCost: string;
  passSerial: string;
  passDate: string;
  passFromDate: string;
  passToDate: string;
  passCheck: string;
  passEvery: string;
  passDwm: string;
  passNote: string;
  passAttach: string;

  ngOnInit() {
  }

  constructor(private location: Location, private iService: ItemfieldsService, private pService: PassServiceService) {console.log(this.iService.getName());}

  alertCancel() {
    this.location.back();
  }

  passData(id, cat, sub, name, purpose, cost, serial, date, from, to, check, every, dwm, note, attach) {
    this.iService.setData(id, cat, sub,name, purpose,cost,serial,date, from,to,check,every,dwm,note,attach);

  }
  
}
