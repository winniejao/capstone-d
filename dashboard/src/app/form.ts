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
    attachment: string;
    notes: string;
}