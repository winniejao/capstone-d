import { Component, OnInit } from '@angular/core';
import { Form } from '../form';
import { DashService } from '../dash.service';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  selectedCategory: string;
  //categories: string[];
  results: Form[];
  search_text: string;

  constructor(
    private service: DashService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    //this.getCategories();
    //this.selectedCategory = this.categories[0];
  }

  getResults(category: string, query: string): void {
    if(category && query) {
      this.service.search(query).subscribe(results => this.results = results);
    }
  }

  /*
  getCategories(): void {
    this.service.getCategories().subscribe(categories => this.categories = categories);
  }
*/
  runSearch(search_text: string): void {
    this.router.navigate(['/searchresult', { search_term: search_text }]);
  }
  /*
  runSearch(cat: string, search_text: string): void {
    this.router.navigate(['/searchresult', { category: cat, search_term: search_text }]);
  }
  */
}
