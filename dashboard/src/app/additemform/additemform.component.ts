import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ItemfieldsService } from '../itemfields.service';
import { DashService } from '../dash.service';
import { Form } from '../form';
import { ActivatedRoute } from '@angular/router';
import { PassServiceService } from '../pass-service.service';
import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'app-additemform',
  templateUrl: './additemform.component.html',
  styleUrls: ['./additemform.component.css']
})

export class AdditemformComponent implements OnInit {
  form: Form;

  name: string;
  item: string;
  purpose: string;
  cost: number;
  serial: string;
  date: string;
  maint_date: string;
  repeat: number;
  attach: string[];
  notes: string; 
  
  constructor(
	private location: Location, 
	private iService: ItemfieldsService,
  public pService: PassServiceService,
  private _electronService: ElectronService,
	private dService: DashService,
  private route: ActivatedRoute
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
  passData(cat, sub, name, item, purpose, cost, serial, date, from,  every, note) {
    //Make sure the attach array is empty, not undefined
    if( !this.selectedFiles) {
      this.selectedFiles = [];
    }

    this.form= { 
      form_id: 0, 
      category: cat, 
      subcat: sub, 
      name: name, 
      item: item, 
      purpose: purpose , 
      cost: cost, 
      serial: serial ? serial : '', 
      date: date ? date : '', 
      maint_date: from ? from : '', 
      repeat: every ? every : 0, 
      attach: this.selectedFiles, 
      notes: note ? note : '' 
    };

    this.dService.addForm(this.form).subscribe( id => {
      if(id[1] != 201){
        console.log('An error has occured adding this item!', this.form);
      }
      var assignedID = id[0];
      console.log('assignedID', assignedID.form_id);
      this.iService.setDatas(assignedID.form_id, cat, sub, name, item, purpose,cost, serial,date, from,every,note,this.selectedFiles);
    });
  }  
    
}
