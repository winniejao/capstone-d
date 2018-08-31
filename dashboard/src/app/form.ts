import { forEach } from "@angular/router/src/utils/collection";

export const FORM_HEADERS: string[] = ['form_id', 'category', 'subcat', 'name', 'item', 'purpose', 'cost', 'serial', 'date', 'maint_date', 'repeat', 'attachment', 'notes'];

export class Form {
    constructor(id: number, cat: string, scat: string){
          this.form_id = id;
          this.category = cat;
          this.subcat = scat;
          this.name = "TestName";
          this.item = "TestItem";
          this.purpose = "TestPurpose";
          this.cost = 3.14;
          this.serial = "ATES-TSER-IAL1";
          this.date = "2018-10-10";
          this.maint_date = "2018-10-10";
          this.repeat = 2;
          this.attach = [];
          this.notes = "TestNote";
    }
    form_id: number;
    category: string;
    subcat: string;
    name: string;
    item: string;
    purpose: string;
    cost: number;
    serial: string;
    date: string;
    maint_date: string;
    repeat: number;
    //Do NOT use forward slashes for paths
    attach: string[];
    notes: string;

}
