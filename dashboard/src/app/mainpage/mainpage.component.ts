import { Component, OnInit } from '@angular/core';
import { HamburgerComponent } from '../hamburger/hamburger.component';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { MatRipple } from "@angular/material";
import { Router } from '@angular/router';

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
  equip: string = 'Equipment';
  tool: string = 'Tool';
  land: string = 'Landscape';
  equipSub1: string = 'Boiler';
  equipSub2: string = "Boiler2";
  equipSub3: string;
  equipSub4: string;
  toolSub1: string = 'Hammer';
  toolSub2: string;
  toolSub3: string;
  toolSub4: string;
  landSub1: string = 'Trail';
  landSub2: string;
  landSub3: string;
  landSub4: string;


  constructor(
    private comp: HamburgerComponent,
    private router: Router,
  ) { }
  equipcat: string[] = ["boiler", "tools", "random", "whatever"];

  callInit() {
    this.comp.initState();
  }


  ngOnInit() { }
}
