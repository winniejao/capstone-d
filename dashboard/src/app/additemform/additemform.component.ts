import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ItemfieldsService } from '../itemfields.service';
import { PassServiceService } from '../pass-service.service';
import { DashService } from '../dash.service';
import { Form } from '../form';
import { ElectronService } from 'ngx-electron';


@Component({
  selector: 'app-additemform',
  templateUrl: './additemform.component.html',
  styleUrls: ['./additemform.component.css']
})
export class AdditemformComponent implements OnInit {

  table_details: Form;

  constructor(
	private location: Location, 
	private iService: ItemfieldsService,
  public pService: PassServiceService,
  private _electronService: ElectronService,
	private dService: DashService
  ) { }

  selectedFiles: string[];

  ngOnInit() {
  }

  addAttachments(): void {
    const path = this._electronService.remote.dialog.showOpenDialog( { properties: ['multiSelections', 'openFile']});
    console.log(path);
    if(path && path.length) {
      this.selectedFiles = path;
    }

  }

  remove(index: number) {
    this.selectedFiles.splice(index, 1);
  }

  alertCancel() {
    this.location.back();
  }

  //attach removed and is now a property of the component
  passData(id, cat, sub, name, item, purpose, cost, serial, date, from,  every, dwm, note) {
    this.iService.setData(id, cat, sub,name, item, purpose,cost,serial,date, from,every,dwm,note,this.selectedFiles);
    this.table_details={form_id:id, category:cat, subcat:sub, name:name, item:item, purpose:purpose, cost:cost, serial:serial, date:date, maint_date:from, repeat:every, attach:this.selectedFiles, notes:note};

    this.dService.addForm(this.table_details).subscribe();
  }
  
}
