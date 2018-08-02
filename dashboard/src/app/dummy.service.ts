// This is a dummy service which returns models of data

import { Injectable } from '@angular/core';
import { SearchResult } from './search-result';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DummyService {
  // For SEARCH-BAR
  categories = ['All', 'Cat1', 'Cat2', 'Cat3'];

  results: SearchResult[] = [
    { name: 'Boiler 1', url: 'boiler1' },
    { name: 'Boiler 2', url: 'boiler2' },
    { name: 'Boiler 3', url: 'boiler3' }
  ];

  // For TABULAR
  // Table based on: https://codeburst.io/display-a-table-using-components-with-angular-4-f13f0971666d
  table_details: any[] =
    [
      {
        name: 'Earl of Lemongrab',
        age: 'Unknown',
        species: 'Lemon Candy',
        occupation: 'Earl, Heir to the Candy Kingdom Throne'
      },
      {
        name: 'Bonnibel Bubblegum',
        age: '19',
        species: 'Gum Person',
        occupation: 'Returned Ruler of the Candy Kingdom'
      },
      {
        name: 'Phoebe',
        age: '16',
        species: 'Flame Person',
        occupation: 'Ruler of the Fire Kingdom'
      },
      {
        name: 'Lumpy Space Princess',
        age: '18',
        species: 'Lumpy Space Person',
        occupation: 'Babysitter'
      },
    ];

  table_columns: string[] = ['name', 'age', 'species', 'occupation'];

  constructor() { }

  getCategories(): Observable<string[]> {
    return of(this.categories);
  }

  // getResults(string): SearchResult[]
  // Return NULL if search text is empty,
  // else return result of query to DB
  getSearchResults(category: string, query: string): Observable<SearchResult[]> {
    return of(this.results);
  }

  // The real service will send+receive from DB
  // For now return model of parsed JSON string 
  getDetails(search: string): Observable<any[]> {
    return of(this.table_details);
  }

  getColumns(search: string): Observable<string[]> {
    return of(this.table_columns);
  }

  // Will return results for the scrolling box on the left
  getSubcat(search: string): Observable<SearchResult[]> {
    return of(this.results);
  }

  // For MOCKING DASH.SERVICE CLASS
}
