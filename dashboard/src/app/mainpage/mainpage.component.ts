import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  
  dropHandler(ev) {
    console.log('File(s) dropped');
    ev.preventDefault();

    if(ev.dataTransfer.itesm) {
      for(var i=0; i<ev.dataTransfer.items.length; i++) {
        if(ev.dataTransfer.items[i].kind === 'file') 
	  var file = ev.dataTransfer.items[i].getAsFile();
 	}
    }
  this.removeDragData(ev);
  }

  removeDragData(ev) {
    if(ev.dataTransfer.items){
      ev.dataTransfer.items.clear();
    } else {
      ev.dataTransfer.clearData();
    }
  }

  dragOverHandler(ev) {

  }
}
