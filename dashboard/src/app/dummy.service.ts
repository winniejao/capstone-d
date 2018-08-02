// This is a dummy service which returns models of data

import { Injectable } from '@angular/core';
import { SearchResult } from './search-result';
import { Observable, of } from 'rxjs';
import { ActivatedRouteSnapshot } from '../../node_modules/@angular/router';
import { Form } from './form';


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
  //Below is the current model of the mock data. 
  //Adding does not currently persist
  dashCategories = [
    'Tools',
    'Equipment',
    'Landscape' 
  ]

  toolSub = [
    'Hammer',
    'Nail',
    'Tool',
    'Pen',
    'Saw',
    'A-Tool',
    'B-Tool',
    'Z-Tool'
  ]

  equipSub = [
    'Computer',
    'EquipmentItem',
    'Truck',
    'Boiler'
  ]

  landSub = [
    'Trails',
    'Benches',
    'Landscape item'
  ]

  dummyForm = new Form(101, 'Equipment', 'Boiler');

  dummyList = [
    new Form(101, 'Tools', 'Hammer'),
    new Form(102, 'Tools', 'Hammer'),
    new Form(103, 'Tools', 'Hammer')
];


    /**
   * Gets a specific form based on its ID. This version extracts the route for you
   * @param route - ActivatedRouteSnapshot of your current location
   * @param id - The form ID number
   */
  getFormFromRoute(route: ActivatedRouteSnapshot, id: number): Observable<Object> {
    return of(this.dummyForm);  
  }

  /**
   * Gets a specific form based on an explicit path and ID
   * @param cat - The category of the form
   * @param sub - The subcategory of the form
   * @param id - The form ID number
   */
  getForm(cat: string, sub: string, id: number): Observable<Object> {
    return of(this.dummyForm);
  }

  getAllForms(cat: string, sub: string): Observable<Form[]> {
    return of(this.dummyList);
  }

  getTools(): Observable<string[]> {
    return of(this.toolSub);
  }

  getEquipment(): Observable<string[]> {
    return of(this.equipSub);
  }

  getLandscape(): Observable<string[]> {
    return of(this.landSub);
  }
  /**
   * This mock function doesn't persist
   * Always returns 201 as the id
   * @param input - A completed form object without a formid
   * @returns - Will return 201
   */
  addForm(input: Form): Observable<number> {
    return of(201);
  }

  /**
   * This mock always succeeds
   * @param cat - The category to be placed under
   * @param input - The name of the category
   */
  addSubcategory(cat: string, input: string): Observable<Object> {
    return of('Added');
  }

}
