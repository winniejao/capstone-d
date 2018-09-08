import { Component, OnInit } from '@angular/core';
import { HamburgerComponent } from '../hamburger/hamburger.component';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { MatRipple } from "@angular/material";
import { Router } from '@angular/router';
import { DashService } from '../dash.service';

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
  equip: string = 'equipment';
  tool: string = 'tools';
  land: string = 'landscape';
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

  quickLand: string[];
  quickTool: string[];
  quickEquip: string[];



  constructor(
    private comp: HamburgerComponent,
    private router: Router,
    private service: DashService
  ) { }
  equipcat: string[] = ["boiler", "tools", "random", "whatever"];

  callInit() {
    this.comp.initState();
  }

  test() {
    console.log('quick equipment', this.quickEquip);
    console.log('quick tools', this.quickTool);
    console.log('quick land', this.quickLand);
  }


  ngOnInit() { 
    this.service.getQuickEquip().subscribe(res => {
      var list = res[0];
      this.quickEquip = list;
    });
    this.service.getQuickTool().subscribe(res => {
      var list = res[0];
      this.quickTool = list;
    });
    this.service.getQuickLand().subscribe(res => {
      var list = res[0];
      this.quickLand = list;
    });
  }
}
