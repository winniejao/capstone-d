import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PassServiceService {
  public passCat:string;
  public passSubcat:string;

  constructor() { 
    this.passCat='';
    this.passSubcat='';
  }
  setData(cat, subcat) {
    this.passCat = cat;
    this.passSubcat = subcat;
  }
  getCat(){return this.passCat;}
  getSubcat(){return this.passSubcat;}
}
