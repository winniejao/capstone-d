import { Component, OnInit } from '@angular/core';
import { ItemfieldsService } from '../itemfields.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-viewitemform',
  templateUrl: './viewitemform.component.html',
  styleUrls: ['./viewitemform.component.css']
})
export class ViewitemformComponent implements OnInit {

  constructor(private iService: ItemfieldsService, private location: Location) { }

  ngOnInit() {
  }

  editData(){
    this.location.back();    
  }
}
