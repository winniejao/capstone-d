import { Component, OnInit } from '@angular/core';
import { SearchResult } from '../search-result';
import { DummyService } from '../dummy.service';
// TODO: use real service
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  selectedCategory: string;
  categories: string[];
  results: SearchResult[];
  search_text: string;

  constructor(
    private dummyService: DummyService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.getCategories();
    this.selectedCategory = this.categories[0];
  }

  getResults(category: string, query: string): void {
    this.dummyService.getSearchResults(category, query).subscribe(results => this.results = results);
  }

  getCategories(): void {
    this.dummyService.getCategories().subscribe(categories => this.categories = categories);
  }

  runSearch(cat: string, search_text: string): void {
    this.router.navigate(['/searchresult', { category: cat, search_term: search_text }]);
  }
}
