import { Component, OnInit } from '@angular/core';
import { DashService } from '../dash.service';

@Component({
  selector: 'app-delete-sub',
  templateUrl: './delete-sub.component.html',
  styleUrls: ['./delete-sub.component.css']
})
export class DeleteSubComponent implements OnInit {
  equipment: string[];
  tools: string[];
  landscape: string[];
  delete = false;
  removed = false;
  selectedCat = '';
  selectedName = '';

  constructor(private service: DashService ) { }

  ngOnInit() {
    this.service.getEquipment().subscribe(x => this.equipment = x);
    this.service.getTools().subscribe(x => this.tools = x);
    this.service.getLandscape().subscribe(x => this.landscape = x);
  }

  confirm(cat: string, name: string): void {
    console.log('confirm',cat, name);
    this.selectedCat = cat.toLowerCase();
    this.selectedName = name.toLowerCase();
    this.delete = true;
  }

  disableDelete(): void {
    this.delete = false;
  }

  deleteSubcategory(): void{
    if(this.selectedCat === 'equipment'){
      this.equipment = this.equipment.filter( item => item.toLowerCase() !== this.selectedName );
    }
    if(this.selectedCat === 'tools'){
      this.equipment = this.equipment.splice(this.equipment.indexOf(name) , 1);
    }
    if(this.selectedCat === 'landscape'){
      this.equipment = this.equipment.splice(this.equipment.indexOf(name) , 1);
    }
    this.service.deleteSubcategory(this.selectedCat, this.selectedName).subscribe();
    this.removed = true;
    this.delete = false;
  }

  closeDelete(): void {
    this.selectedCat = '';
    this.selectedName = '';
    this.removed = false;
    this.delete = false;
  }

}
