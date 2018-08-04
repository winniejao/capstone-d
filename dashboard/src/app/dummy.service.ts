// This is a dummy service which returns models of data

import { Injectable } from '@angular/core';
import { SearchResult } from './search-result';
import { Observable, of } from 'rxjs';
import { ActivatedRouteSnapshot } from '../../node_modules/@angular/router';
import { Form } from './form';
import { ServiceInterface } from './service-interface';
import { MasterService } from './master-service';


@Injectable({
  providedIn: 'root'
})
export class DummyService implements MasterService {
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

  dummyEquipmentList = [
    new Form(101, 'Equipment', 'Boiler'),
    new Form(102, 'Equipment', 'Boiler'),
    new Form(103, 'Equipment', 'Boiler')
  ];

  dummyToolList = [
    new Form(201, 'Tool', 'Hammer'),
    new Form(202, 'Tool', 'Hammer'),
    new Form(203, 'Tool', 'Hammer')
  ];

  dummyLandscapeList = [
    new Form(301, 'Landscape', 'Trail'),
    new Form(302, 'Landscape', 'Trail'),
    new Form(303, 'Landscape', 'Trail')
  ];

  /**
   * Gets a specific form based on its ID. This version extracts the route for you
   * @deprecated - Not currently working well
   * @param route - ActivatedRouteSnapshot of your current location
   * @param id - The form ID number
   * @todo Restructure routing so that we can make a few assumptions about the format of the route
   */
  getFormFromRoute(route: ActivatedRouteSnapshot, id: number): Observable<Form> {
    return of(this.dummyForm);  
  }

  /**
   * Gets a specific form based on an explicit path and ID
   * @param cat - The category of the form
   * @param sub - The subcategory of the form
   * @param id - The form ID number
   */
  getForm(cat: string, sub: string, id: number): Observable<Form> {
    return of(this.dummyForm);
  }

  /**
   * Gets all forms for a category and subcategory
   * @param cat - The category of the form dump
   * @param sub - The subcategory of the form dump
   */
  getAllForms(cat: string, sub: string): Observable<Form[]> {
    console.log('Cat is: ' + cat + ' sub is: ' + sub);
    switch(cat.toLowerCase()){
      case 'equipment': {
        return of(this.dummyEquipmentList);
      }

      case 'tool': {
        return of(this.dummyToolList);
      }

      case 'landscape': {
        return of(this.dummyLandscapeList);
      }

      default: {
        console.log('Incorrectly formatted call to getAllForms dummy service! Returning equipment list');
      }

      return of(this.dummyEquipmentList);
    }
  }

  /**
   * Gets a list of all possible Tool subcategories
   * @returns string[] of subcategories
   */
  getTools(): Observable<string[]> {
    return of(this.toolSub);
  }

  /**
   * Gets a list of all possible Equipment subcategories
   * @returns string[] of subcategories
   */
  getEquipment(): Observable<string[]> {
    return of(this.equipSub);
  }

  /**
   * Gets a list of all possible Landscape subcategories
   * @returns string[] of subcategories
   */
  getLandscape(): Observable<string[]> {
    return of(this.landSub);
  }

  /**
   * @param input - WHEN MOCKING must have formid, on prod must be empty
   * @returns - The assigned formid or 0 if unsuccessful
   */
  addForm(input: Form): Observable<number> {    
    switch(input.category.toLowerCase()){
      case 'equipment': {
        this.dummyEquipmentList.push(input);
        break;
      }

      case 'tool': {
        this.dummyToolList.push(input);;
        break;
      }

      case 'landscape': {
        this.dummyLandscapeList.push(input);
        break;
      }

      default: {
        console.log('Incorrectly formatted call to addForm dummy service!');
        return of(0);
      }
    }

    //In the real example the server will generate the form ID
    return of(input.formid);
  }

  /**
   * Adds a new subcategory to the database under a parent category
   * @param cat - The category to be placed under
   * @param input - The name of the category
   */
  addSubcategory(cat: string, input: string): Observable<Object> {

    switch(cat.toLowerCase()){
      case 'equipment': {
        this.equipSub.push(input);
        break;
      }

      case 'tool': {
        this.toolSub.push(input);
        break;
      }

      case 'landscape': {
        this.landSub.push(input);
        break;
      }

      default: {
        console.log('Incorrectly formatted call to addSubcategory dummy service!');
      }

    }
    return of('Added');
  }

}
