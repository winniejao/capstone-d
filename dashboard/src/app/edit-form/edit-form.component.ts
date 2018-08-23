import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DashService } from '../dash.service';
import { Form } from '../form';

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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: DashService,
  ) { }

  ngOnInit() {
    this.id = this.stringToNum(this.route.snapshot.paramMap.get('id'));
    this.category = this.route.snapshot.paramMap.get('category');
    this.subcat = this.route.snapshot.paramMap.get('subcat');
    this.service.getForm(this.category, this.subcat, this.id).subscribe(form => this.form = form);
  }

  stringToNum(str: any): number {
    return str * 1;
  }
}
