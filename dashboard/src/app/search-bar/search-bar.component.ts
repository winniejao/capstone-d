import { Component, OnInit } from '@angular/core';
import { SearchResult } from '../search-result';
import { DummyService } from '../dummy.service';
// TODO: use real service
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  search_text: string;
  categories: string[];
  results: SearchResult[];

  constructor(
    private dummyService: DummyService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.getCategories();
  }

  getResults(category: string, query: string): void {
    this.dummyService.getSearchResults(category, query).subscribe(results => this.results = results);
  }

  getCategories(): void {
    this.dummyService.getCategories().subscribe(categories => this.categories = categories);
  }

  runSearch(search_text: string): void {
    this.router.navigate(['searchresult', { search_text: search_text }]);
  }
}
