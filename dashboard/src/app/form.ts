import { forEach } from "@angular/router/src/utils/collection";

export const FORM_HEADERS: string[] = ['form_id', 'category', 'subcat', 'name', 'item', 'purpose', 'cost', 'serial', 'date', 'maint_date', 'repeat', 'attachment', 'notes'];
export const FORM_HEADERS_ABR: string[] = ['form_id', 'name', 'item', 'purpose', 'cost', 'serial', 'date', 'maint_date', 'attachment', 'notes'];
export const FORM_HEADERS_XREPEAT: string[] = ['form_id', 'category', 'subcat', 'name', 'item', 'purpose', 'cost', 'serial', 'date', 'maint_date', 'attachment', 'notes'];

/*
 * The constructor is for the dummyservice mock. It should really be an optional parameter constructor
 */
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
          this.maint_date = "2018-8-27";
          this.repeat = 2;
          this.attach = [];
          this.notes = "TestNote";
          this.completed = 0;
    }
    form_id: number;
    category: string;
    //0 for uncompleted
    //1 for completed
    completed: number;
    subcat: string;
    name: string;
    item: string;
    purpose: string;
    cost: number;
    serial: string;
    date: string;
    maint_date: string;
    repeat: number;
    //Do NOT use back slashes for paths
    //Note the DashService cleanattach for regex to clean it
    attach: string[];
    notes: string;

}
