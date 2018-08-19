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
  private equip: string = 'Equipment';
  private tool: string = 'Tools';
  private land: string = 'Landscape';
  private equipSub1: string = 'Boiler';
  private equipSub2: string;
  private equipSub3: string;
  private equipSub4: string;
  private toolSub1: string = 'Hammer';
  private toolSub2: string;
  private toolSub3: string;
  private toolSub4: string;
  private landSub1: string = 'Trail';
  private landSub2: string;
  private landSub3: string;
  private landSub4: string;


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
