import { Component, OnInit } from '@angular/core';
import { SearchResult } from '../search-result';
import { SearchBarService } from '../search-bar.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  search_text: string;
  categories: string[];
  results: SearchResult[];

  constructor(private searchBarService: SearchBarService) { }

  ngOnInit() {
    this.getCategories();
  }

  getResults(query: string): void {
    this.results = this.searchBarService.getResults(query);
  }

  getCategories(): void {
    this.categories = this.searchBarService.getCategories();
  }
}
