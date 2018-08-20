import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemfieldsService {
  public passName:string;
  public passPurpose:string;
  public passCost:number;
  public passSerial:string;
  public passDate:string;
  public passFromDate:string;
  public passToDate:string;
  public passCheck:string;
  public passEvery:string;
  public passDwm:string;
  public passAttach:string;
  public passNote:string;

  constructor() {
    this.passName='';
    this.passPurpose='';
    this.passCost=0;
    this.passSerial='';
    this.passDate='';
    this.passFromDate='';
    this.passToDate='';
    this.passCheck='';
    this.passEvery='';
    this.passDwm='';
    this.passAttach='';
    this.passNote='';
  }

  setData(name, purpose, cost, serial, date, from, to, check, every, dwm, attach, note) {
    this.passName = name;
    this.passPurpose = purpose;
    this.passCost = cost;
    this.passSerial = serial;
    this.passDate = date;
    this.passFromDate = from;
    this.passToDate = to;
    this.passCheck = check;
    this.passEvery = every;
    this.passDwm = dwm;
    this.passAttach = attach;
    this.passNote = note;
  }

  getName(){return this.passName;}
  getPurpose(){return this.passPurpose;}
  getCost(){return this.passCost;}
  getSerial(){return this.passSerial;}
  getDate(){return this.passDate;}
  getFromDate(){return this.passFromDate;}
  getToDate(){return this.passToDate;}
  getEvery(){return this.passEvery;}
  getCheck(){return this.passCheck;}
  getDwm(){return this.passDwm;}
  getAttach(){return this.passAttach;}
  getNote(){return this.passNote;}
}
