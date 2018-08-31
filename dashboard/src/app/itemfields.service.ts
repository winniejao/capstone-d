import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemfieldsService {
  public passId:string;
  public passCat:string;
  public passSubcat:string;
  public passItem:string;
  public passName:string;
  public passPurpose:string;
  public passCost:number;
  public passSerial:string;
  public passDate:string;
  public passFromDate:string;
  public passEvery:string;
  public passAttach:string[];
  public passNote:string;

  constructor() {
    this.passId='';
    this.passCat='';
    this.passSubcat='';
    this.passName='';
    this.passItem='';
    this.passPurpose='';
    this.passCost=0;
    this.passSerial='';
    this.passDate='';
    this.passFromDate='';
    this.passEvery='';
    this.passAttach=[];
    this.passNote='';
  }

  setData(cat, subcat,name,item, purpose, cost, serial, date, from, every, attach, note) {
    this.passCat = cat;
    this.passSubcat = subcat;
    this.passName = name;
    this.passItem = item;
    this.passPurpose = purpose;
    this.passCost = cost;
    this.passSerial = serial;
    this.passDate = date;
    this.passFromDate = from;
    this.passEvery = every;
    this.passAttach.push(attach);
    this.passNote = note;
  }

  setDatas(id, cat, subcat,name,item, purpose, cost, serial, date, from, every, attach, note) {
    this.setData(cat, subcat,name,item, purpose, cost, serial, date, from, every, attach, note);
  }

  getID(){return this.passId;}
  getCat(){return this.passCat;}
  getSubcat(){return this.passSubcat;}
  getName(){return this.passName;}
  getItem(){return this.passItem;}
  getPurpose(){return this.passPurpose;}
  getCost(){return this.passCost;}
  getSerial(){return this.passSerial;}
  getDate(){return this.passDate;}
  getFromDate(){return this.passFromDate;}
  getEvery(){return this.passEvery;}
  getAttach(){return this.passAttach;}
  getNote(){return this.passNote;}
}
