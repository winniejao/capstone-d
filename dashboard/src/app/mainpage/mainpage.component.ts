import { Component, OnInit } from '@angular/core';
import { HamburgerComponent } from '../hamburger/hamburger.component';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import {MatRipple} from "@angular/material";

@NgModule({
  imports: [
    MatButtonModule
  ]
})
@Component({
  providers: [HamburgerComponent],
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit{

  constructor(private comp: HamburgerComponent) { }
  equipcat: string[] = ["boiler", "tools", "random", "whatever"];

  callInit() {
    this.comp.initState();
  }


  ngOnInit() {}
}
