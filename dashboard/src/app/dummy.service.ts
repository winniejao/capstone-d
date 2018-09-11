// This is a dummy service which returns models of data

import { Injectable } from '@angular/core';
import { SearchResult } from './search-result';
import { Observable, of } from 'rxjs';
import { Form, FORM_HEADERS } from './form';
import { MOCK_FORMS, MOCK_NUMBER } from './mock_forms'
import { ActivatedRouteSnapshot } from '../../node_modules/@angular/router';
import { MasterService, ArrayResponse, SingleResponse, QuickResponse, EventResponse, PMForm, PMResponse } from './master-service';
import { HttpResponse } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class DummyService implements MasterService {
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

  querySearch(search_term: string): Observable<Form[]>{
    return of(MOCK_FORMS);
  }

  getCategories(): Observable<string[]> {
    return of(this.dashCategories);
  }

  // getResults(string): SearchResult[]
  // Return NULL if search text is empty,
  // else return result of query to DB
  getSearchResults(category: string, query: string): Observable<SearchResult[]> {
    return of(this.results);
  }

  // The real service will send+receive from DB
  getDetails(cat:string, subcat: string): Observable<Form[]> {
    if (cat == 'test') {
      return of(MOCK_FORMS);
    }
    else {
      return this.getAllForms(cat, subcat)[0];
    }
  }

  getNum(cat: string, subcat: string): Observable<number> {
    if (cat == 'test') {
      return of(MOCK_NUMBER);
    }
    return of(MOCK_NUMBER);
  }

  getColumns(cat: string, subcat: string): Observable<string[]> {
    return of(FORM_HEADERS);
  }

  // Will return results for the scrolling box on the left
  getItems(cat: string, subcat: string): Observable<string[]> {
    if (cat == 'Equipment') {
      return this.getEquipment();
    }
    else if (cat == 'Tool') {
      return this.getTools();
    }
    else if (cat == 'Landscape') {
      return this.getLandscape();
    }
    else {
      console.log(cat + ' is not a defined category.');
      return null;
    }
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
  getForm(cat: string, sub: string, id: number): Observable<SingleResponse> {
    switch(cat.toLowerCase()){
      case 'equipment': {
        return of( { 0:this.dummyEquipmentList.find(x => x.form_id == id), 1:200 });
      }

      case 'tool': {
        return of( { 0:this.dummyToolList.find(x => x.form_id == id), 1:200 });
      }

      case 'landscape': {
        return of( { 0:this.dummyLandscapeList.find(x => x.form_id == id), 1:200 });
      }

      default: {
        console.log('Incorrectly formatted call to single form dummy service! returning dummy form');
      }
      return of( { 0: this.dummyForm,  1: 404 } );
    }
  }

  /** 
   * Search the database for all fields
   * @param target - The search string
   */
  search(target: string): Observable<Form[]> {
    var data = this.dummyEquipmentList.concat(this.dummyLandscapeList, this.dummyToolList);
    return(of(data.filter( x => 
      x.notes.toLowerCase().includes(target.toLowerCase()) || x.name.toLowerCase().includes(target)
    )));
  }

  /**
   * Gets all forms for a category and subcategory
   * @param cat - The category of the form dump
   * @param sub - The subcategory of the form dump
   */
  getAllForms(cat: string, sub: string): Observable<ArrayResponse> {
    console.log('Cat is: ' + cat + ' sub is: ' + sub);
    switch(cat.toLowerCase()){
      case 'equipment': {
        return of( { 0: this.dummyEquipmentList, 1: 200});
      }

      case 'tool': {
        return of( { 0: this.dummyToolList, 1: 200});      }

      case 'landscape': {
        return of( { 0: this.dummyLandscapeList, 1: 200});      }

      default: {
        console.log('Incorrectly formatted call to getAllForms dummy service! Returning equipment list');
      }

      return of( { 0: this.dummyEquipmentList, 1: 200});    }
  }

  /**
   * Gets a variable list of subcategories 
   * @param path The extracted path, ie equipment or tool
   */
  getSubCat(path: string): Observable<string[]> {
    switch(path.toLowerCase()){
      case 'equipment': {
        return this.getEquipment();
        //break;
      }

      case 'tool': {
        return this.getTools();
        //break;
      }

      case 'landscape': {
        return this.getLandscape();
        //break;
      }

      default: {
        console.log('Incorrectly formatted call to getsubcat dummy service!');
        return of(this.toolSub);
      }
    }
  }

  getQuickTool(): Observable<QuickResponse>{
    return of({ 0: this.toolSub.slice(0,4), 1: 200 });
  }

  getQuickEquip(): Observable<QuickResponse>{
    return of({ 0: this.equipSub.slice(0,4), 1: 200 });
  }

  getQuickLand(): Observable<QuickResponse>{
    return of({ 0: this.landSub.slice(0,4), 1: 200 });
  }

  openFile(input: Form, filename: string): Observable<any> {
    console.log('Dummy data cannot open without python!');
    return of();
  }

  backup( filepath: string): Observable<any> {
    console.log('Dummy data cannot backup without python!');
    return of();
  }

  restore( filepath: string): Observable<any> {
    console.log('Dummy data cannot restore without python!');
    return of();
  }

  getEvents(month: Date): Observable<EventResponse> {
    return of( { 0: { Equipment: this.dummyEquipmentList, Landscape: this.dummyLandscapeList, Tools: this.dummyToolList }, 1: 200});
  }



  getPM(cat: string, subcat: string): Observable<PMResponse> {
    var rawData = this.dummyEquipmentList.concat(this.dummyLandscapeList, this.dummyToolList);
    var filteredData = rawData.filter( x => x.maint_date) as PMForm[];
    return of( { 0: filteredData, 1: 201});
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
    return of(input.form_id);
  }

  /**
   * Delete the form
   * @param input The form to be deleted
   */
  deleteForm(input: Form): Observable<any> {
    switch(input.category.toLowerCase()){
      case 'equipment': {
        var found = this.dummyEquipmentList.findIndex( x => x.form_id == input.form_id)
        if( found === -1){
          return of(new HttpResponse({status: 404}))
        }
        this.dummyEquipmentList.splice(found, 1);
        return of(new HttpResponse({status: 200}));
      }

      case 'tool': {
        var found = this.dummyToolList.findIndex( x => x.form_id == input.form_id)
        if( found === -1){
          return of(new HttpResponse({status: 404}))
        }
        this.dummyToolList.splice(found, 1);
        return of(new HttpResponse({status: 200}));
      }

      case 'landscape': {
        var found = this.dummyLandscapeList.findIndex( x => x.form_id == input.form_id)
        if( found === -1){
          return of(new HttpResponse({status: 404}))
        }
        this.dummyLandscapeList.splice(found, 1);
        return of(new HttpResponse({status: 200}));
      }
        default: {
          console.log('Incorrectly formatted DELETE form');
        }
    }
    return of(new HttpResponse({status: 404}))
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

  /**
   * replaces the DB version of the provided form based on form id.
   * @param input - The updated form, this form's FID will be extracted and all fields updated
   */
  updateForm(input: Form): Observable<any> {
    switch(input.category.toLowerCase()){
      case 'equipment': {
        var found = this.dummyEquipmentList.findIndex( x => x.form_id == input.form_id)
        if( found === -1){
          return of(new HttpResponse({status: 404}))
        }
        this.dummyEquipmentList[found] = input;
        return of(new HttpResponse({status: 200}));
      }

      case 'tool': {
        var found = this.dummyToolList.findIndex( x => x.form_id == input.form_id)
        if( found === -1){
          return of(new HttpResponse({status: 404}))
        }
        this.dummyToolList[found] = input;
        return of(new HttpResponse({status: 200}));
      }

      case 'landscape': {
        var found = this.dummyLandscapeList.findIndex( x => x.form_id == input.form_id)
        if( found === -1){
          return of(new HttpResponse({status: 404}))
        }
        this.dummyLandscapeList[found] = input;
        return of(new HttpResponse({status: 200}));
      }
        default: {
          console.log('Incorrectly formatted PUT');
        }
    }
    return of(new HttpResponse({status: 404}))
  }

  /**
   * Deletes the subcategory according to this path. ASSUMES frontend did check
   * Very destructive, be careful
   * @param cat The category
   * @param sub The subcategory to be deleted
   */
  deleteSubcategory(cat: string, sub: string): Observable<any> {
    switch(cat.toLowerCase()){
      case 'equipment': {
        var found = this.equipSub.findIndex( x => x === sub)
        if( found === -1){
          return of(new HttpResponse({status: 404}))
        }
        this.equipSub.splice(found, 1);
        return of(new HttpResponse({status: 200}));
      }

      case 'tool': {
        var found = this.toolSub.findIndex( x => x === sub)
        if( found === -1){
          return of(new HttpResponse({status: 404}))
        }
        this.toolSub.splice(found, 1);
        return of(new HttpResponse({status: 200}));
      }

      case 'landscape': {
        var found = this.landSub.findIndex( x => x === sub)
        if( found === -1){
          return of(new HttpResponse({status: 404}))
        }
        this.landSub.splice(found, 1);
        return of(new HttpResponse({status: 200}));
      }
        default: {
          console.log('Incorrectly formatted Delete');
        }
    }

  }


}
