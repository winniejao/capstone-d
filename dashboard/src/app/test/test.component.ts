import { Component, OnInit } from '@angular/core';
import { DashService } from '../dash.service';
import { Form } from '../form'

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor(private service: DashService) { }
  result: string;
  resultsArr: string[] = [];

  category: string;
  subcategory: string;


  getTool(): void {
    this.service.getTools().subscribe(val => this.resultsArr = val);
  }

  getEquip(): void {
    this.service.getEquipment().subscribe(val => this.resultsArr = val);
  }

  getLand(): void {
    this.service.getLandscape().subscribe(val => this.resultsArr = val);
  }

  getForm(fid: number): void {
    this.service.getForm(this.category, this.subcategory, fid).subscribe(v => {
      this.resultsArr.push('Single get form: ' + v.name + ' ' + v.formid + '| ' + v.purpose);
    })
  }

  addSub(): void {
    this.service.addSubcategory(this.category, this.subcategory).subscribe();
  }

  getForms(): void {
    var output: Form[];
    this.service.getAllForms(this.category, this.subcategory).subscribe(v => output = v);
    console.log(output);

    output.forEach(element => {
      this.resultsArr.push('Form: ' + element.name + ' ' + element.formid + '| ' + element.purpose);
    });
 
  }

  search(input: string): void {
    var output: Form[];
    this.service.search(input).subscribe(x => output = x );
    output.forEach(element => {
      this.resultsArr.push('Form: ' + element.name + ' ' + element.formid + '| ' + element.purpose);
    });
  }

  deleteForm(fid: number): void {
    this.service.deleteForm(new Form(fid, this.category, this.subcategory )).subscribe( () => console.log("Deleting form", fid));
  }

  updateForm(fid: number): void {
    //Figure out flatmap
    var copy = new Form(fid, this.category, this.subcategory);
    copy.purpose = 'Edited by update';
    console.log(copy);
    this.service.updateForm(copy).subscribe(v => console.log('Updated', fid));
  }

  deleteSub(): void {
    this.service.deleteSubcategory(this.category, this.subcategory).subscribe( () => console.log('Deleting', this.subcategory));
  }

  post(): void {
    var inputForm = new Form(
      Math.floor(Math.random()*1000+1),
      this.category,
      this.subcategory
    );

    this.service.addForm(inputForm).subscribe(val => console.log(val));

  }

  ngOnInit() {
  }

}
