// This is a dummy service which returns models of data

import { Injectable } from '@angular/core';
import { SearchResult } from './search-result';
import { Observable, of } from 'rxjs';
import { Form, FORM_HEADERS } from './form';
import { MOCK_FORMS, MOCK_NUMBER } from './mock_forms'


@Injectable({
  providedIn: 'root'
})
export class DummyService {
  // For SEARCH-BAR
  categories = ['All', 'Cat1', 'Cat2', 'Cat3'];

  results: SearchResult[] = [
    { name: 'Boiler 1', url: 'boiler1' },
    { name: 'Boiler 2', url: 'boiler2' },
    { name: 'Boiler 3', url: 'boiler3' },
    { name: 'Boiler 3', url: 'boiler3' },
    { name: 'Boiler 3', url: 'boiler3' },
    { name: 'Boiler 3', url: 'boiler3' },
    { name: 'Boiler 3', url: 'boiler3' },
    { name: 'Boiler 3', url: 'boiler3' },
    { name: 'Boiler 3', url: 'boiler3' },
    { name: 'Boiler 3', url: 'boiler3' },
    { name: 'Boiler 3', url: 'boiler3' },
    { name: 'Boiler 3', url: 'boiler3' },
    { name: 'Boiler 3', url: 'boiler3' },
    { name: 'Boiler 3', url: 'boiler3' },
    { name: 'Boiler 3', url: 'boiler3' },
    { name: 'Boiler 3', url: 'boiler3' },
    { name: 'Boiler 3', url: 'boiler3' },
    { name: 'Boiler 3', url: 'boiler3' },
    { name: 'Boiler 3', url: 'boiler3' },
    { name: 'Boiler 3', url: 'boiler3' },
    { name: 'Boiler 3', url: 'boiler3' },
    { name: 'Boiler 3', url: 'boiler3' },
    { name: 'Boiler 3', url: 'boiler3' },
    { name: 'Boiler 3', url: 'boiler3' },
    { name: 'Boiler 3', url: 'boiler3' },
    { name: 'Boiler 3', url: 'boiler3' },
    { name: 'Boiler 3', url: 'boiler3' },
    { name: 'Boiler 3', url: 'boiler3' },
    { name: 'Boiler 3', url: 'boiler3' },
    { name: 'Boiler 3', url: 'boiler3' },
    { name: 'Boiler 3', url: 'boiler3' },
    { name: 'Boiler 3', url: 'boiler3' }
  ];

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
  getDetails(search: string): Observable<any[]> {
    return of(MOCK_FORMS);
  }

  getNum(search: string): Observable<number> {
    return of(MOCK_NUMBER);
  }

  getColumns(search: string): Observable<string[]> {
    return of(FORM_HEADERS);
  }

  // Will return results for the scrolling box on the left
  getItems(search: string): Observable<SearchResult[]> {
    return of(this.results);
  }
}
