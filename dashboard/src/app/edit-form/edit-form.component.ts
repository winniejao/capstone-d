import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DashService } from '../dash.service';
import { Form } from '../form';
import { SingleResponse } from '../master-service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { validateConfig } from '@angular/router/src/config';
import { dateValidator, FormValidatorDirective } from '../form-validator.directive';
import { DISABLED } from '@angular/forms/src/model';
import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent implements OnInit {
  id: number;
  category: string;
  subcat: string;
  form: Form;
  newForm: FormGroup;
  submitted: boolean = false;
  edit: boolean = false;
  deleting: boolean = false;
  deleted: boolean = false;
  completed: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _electronService: ElectronService,
    private service: DashService,
  ) { }

  ngOnInit() {
    this.newForm = new FormGroup({
      name: new FormControl(''),
      item: new FormControl(''),
      purpose: new FormControl(''),
      cost: new FormControl(''),
      serial: new FormControl(''),
      maint_date: new FormControl(''),
      complete: new FormControl(''),
      repeat: new FormControl(''),
      notes: new FormControl(''),
    });
    this.id = this.stringToNum(this.route.snapshot.paramMap.get('id'));
    this.category = this.route.snapshot.paramMap.get('category');
    this.subcat = this.route.snapshot.paramMap.get('subcat');
    this.service.getForm(this.category, this.subcat, this.id).subscribe(
      res => this.form = res[0],
      error => console.log("Error: ", error),
      () => {
        this.initNewForm();
        if( this.form.completed === 1) {
          this.completed = true;
        } else {
          this.completed = false;
        }
      } 
      );
  }

  stringToNum(str: any): number {
    return str * 1;
  }

  open(input: string): void {
    this.service.openFile(this.form,input).subscribe();
  }

  addAttachments(): void {
    const path = this._electronService.remote.dialog.showOpenDialog( { properties: ['multiSelections', 'openFile']});
    console.log(path);
    if(path && path.length) {
      if(this.form.attach){
        path.forEach(fp => {
          this.form.attach.push(fp);
          this.newForm.markAsDirty();
        })
      } else {
        this.form.attach = path;
        this.newForm.markAsDirty();
      }

    }

  }

  initNewForm(): void {
    this.newForm = new FormGroup({
      name: new FormControl(this.form.name,
        [Validators.required]),
      item: new FormControl(this.form.item,
        [Validators.required]),
      purpose: new FormControl(this.form.purpose,
        [Validators.required]),
      cost: new FormControl(this.form.cost,
        [Validators.required]),
      serial: new FormControl(this.form.serial),
      maint_date: new FormControl(this.form.maint_date),
      complete: new FormControl(this.completed),
      repeat: new FormControl(this.form.repeat),
      notes: new FormControl(this.form.notes),
    });
    this.newForm.disable();
  }

  onSubmit(): void {
    this.form.name = this.newForm.get('name').value;
    this.form.purpose = this.newForm.get('purpose').value;
    this.form.item = this.newForm.get('item').value;
    this.form.cost = this.newForm.get('cost').value;
    this.form.serial = this.newForm.get('serial').value;
    this.form.maint_date = this.newForm.get('maint_date').value;
    this.form.repeat = this.newForm.get('repeat').value;
    this.form.notes = this.newForm.get('notes').value;
    if(this.newForm.get('complete').value) {
      this.form.completed = 1;
    } else {
      this.form.completed = 0;
    }
    console.log('insideonSubmit', this.form);
    this.service.updateForm(this.form).subscribe();
    this.submitted = true;
  }

  enableEdit(): void {
    if (this.newForm.disabled) {
      this.newForm.enable();
    }
    this.edit = true;
  }

  enableDelete(): void {
    this.deleting = true;
  }

  disableDelete(): void {
    this.deleting = false;
  }

  deleteForm(): void {
    this.deleting = false;
    this.deleted = true;
    this.service.deleteForm(this.form).subscribe();
  }
}
