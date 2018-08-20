import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ItemfieldsService } from '../itemfields.service';

@Component({
  selector: 'app-additemform',
  templateUrl: './additemform.component.html',
  styleUrls: ['./additemform.component.css']
})
export class AdditemformComponent implements OnInit {
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

  constructor(private location: Location, private iService: ItemfieldsService) {console.log(this.iService.getName());}

  alertCancel() {
    this.location.back();
  }

  passData(name, purpose, cost, serial, date, from, to, check, every, dwm, note, attach) {
    this.iService.setData(name, purpose,cost,serial,date, from,to,check,every,dwm,note,attach);
  }
}
