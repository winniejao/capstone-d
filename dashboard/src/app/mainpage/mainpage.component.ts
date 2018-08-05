import { Component, OnInit } from '@angular/core';
import { HamburgerComponent } from '../hamburger/hamburger.component';

@Component({
  providers: [HamburgerComponent],
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit{

  constructor(private comp: HamburgerComponent) { }

  callInit() {
    this.comp.initState();
  }
 
  ngOnInit() {} 
}
