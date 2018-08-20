import { forEach } from "@angular/router/src/utils/collection";

export const FORM_HEADERS: string[] = ['formid', 'category', 'subcat', 'name', 'item', 'purpose', 'cost', 'serial', 'date', 'maint_date', 'repeat', 'attachment', 'notes'];

export class Form {
    constructor(id: number, cat: string, scat: string){
          this.formid = id;
          this.category = cat;
          this.subcat = scat;
          this.name = "TestName";
          this.item = "TestItem";
          this.purpose = "TestPurpose";
          this.cost = 3.14;
          this.serial = "ATES-TSER-IAL1";
          this.date = "11/22/2018";
          this.maint_date = "2018-10-10";
          this.repeat = 2;
          this.attachment = "C:/testpath";
          this.notes = "TestNote";
    }
    constructor(id: number, cat: string, scat: string, name: string){
        this.formid = id;
        this.category = cat;
        this.subcat = scat;
        this.name = "TestName";
        this.item = "TestItem";
        this.purpose = "TestPurpose";
        this.cost = 3.14;
        this.serial = "ATES-TSER-IAL1";
        this.date = "11/22/2018";
        this.maint_date = "2018-10-10";
        this.repeat = 2;
        this.attachment = "C:/testpath";
        this.notes = "TestNote";
  }
    formid: number;
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
    attachment: string;
    notes: string;

}
