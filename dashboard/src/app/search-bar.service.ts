import { Injectable } from '@angular/core';
import { SearchResult } from './search-result';

@Injectable({
  providedIn: 'root'
})
export class SearchBarService {

  categories = ['All', 'Cat1', 'Cat2', 'Cat3'];

  results: SearchResult[] = [
    { name: 'Boiler 1', url: 'boiler1' },
    { name: 'Boiler 2', url: 'boiler2' },
    { name: 'Boiler 3', url: 'boiler3' }
  ];

  constructor() { }

  getCategories(): string[] {
    return this.categories;
  }
  // TODO: Automate category collecting. Currently returns dummy data.

  // getResults(string): SearchResult[]
  // Return NULL if search text is empty,
  // else return result of query to DB
  getResults(query: string): SearchResult[] {
    if (query == '') { return null }
    else { return this.results}
  }
  // TODO: Make this actually query the DB. Currently returns dummy data.
}
