export class Form {
  formid: number;
  subcat: string;
  name:   string;
  item:   string;
  purpose: string;
  cost:   number; // TS numbers are floats
  serial: string;
  date:   string;
  attach: string[];
  notes: string;

}

export const FORM_HEADERS: string[] = ['formid', 'subcat', 'name', 'item', 'purpose', 'cost', 'serial', 'date', 'attach', 'notes'];
