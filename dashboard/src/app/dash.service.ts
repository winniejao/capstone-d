import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ActivatedRouteSnapshot } from '../../node_modules/@angular/router';
import { Form } from './form'
import { MasterService, ArrayResponse, SingleResponse, QuickResponse, EventResponse, PMResponse, PMForm } from './master-service';
import { HttpResponse } from '@angular/common/http';
import { del } from '../../node_modules/@types/selenium-webdriver/http';

const pythonURL = 'http://127.0.0.1:5000';

@Injectable({
  providedIn: 'root'
})

export class DashService implements MasterService {

  

  constructor(private http: HttpClient) { }

  private cleanAttach(input: string[]){
    var output = [];
    if(input){
      input.forEach(element => {
        element = element.replace(/\\/g, '/');
        output.push(element.replace(/\\/g, '/'));
      });
      console.log('Clean attachment returning', output);
      return output;
    } else {
      return [];
    }
  }

  private cleanPath(input: string): string {
    const escaped = input.replace(/\\/g, '/');
    if(escaped[escaped.length - 1] === '/') {
      return escaped;
    } else {
      return escaped + '/';
    } 

  }

  /**
   * Gets a specific form based on its ID. This version extracts the route for you
   * @deprecated - Not currently working well
   * @param route - ActivatedRouteSnapshot of your current location
   * @param id - The form ID number
   * @todo Restructure routing so that we can make a few assumptions about the format of the route
   */
  getFormFromRoute(route: ActivatedRouteSnapshot, id: number): Observable<Form> {
    var routeUrl = route.url;
    var category = routeUrl[0];
    var subcategory = routeUrl[1];
    return this.http.get<Form>(pythonURL + category + subcategory).pipe(
      catchError(this.handleError('getForm', undefined)),
      tap(data => console.log(data)
      ));
  }

  /**
   * Gets a specific form based on an explicit path and ID
   * @param cat - The category of the form
   * @param sub - The subcategory of the form
   * @param id - The form ID number
   */
  getForm(cat: string, sub: string, id: number): Observable<SingleResponse> {
    return this.http.get<Form>(pythonURL + '/form/' + cat + '/' + sub + '/' + id).pipe(
      catchError(this.handleError('getForm', undefined)),
      tap(data => console.log(data)
      ));
  }

  /** 
   * Search the database for all fields
   * @param target - The search string
   */
  search(target: string): Observable<Form[]> {
    return this.http.post<Form[]>(pythonURL + '/search', { search: target}).pipe(
      catchError(this.handleError('search', [])),
      tap(data => console.log(data)
    ));
  }


  /**
   * Gets all forms for a category and subcategory
   * @param cat - The category of the form dump
   * @param sub - The subcategory of the form dump
   * 
   */
  // getAllForms(cat: string, sub: string): Observable<Form[]> {
  //   return this.http.get<Form[]>(pythonURL + '/form/' + cat.toLowerCase() + '/' + sub.toLowerCase()).pipe(
  //     catchError(this.handleError('getAllForms', null)),
  //     tap(data => console.log('I am the tapped data',data)
  //     ));
  // }

    /**
   * Gets all forms for a category and subcategory
   * @param cat - The category of the form dump
   * @param sub - The subcategory of the form dump
   * 
   */
  getAllForms(cat: string, sub: string): Observable<ArrayResponse> {
    return this.http.get<ArrayResponse>(pythonURL + '/form/' + cat.toLowerCase() + '/' + sub.toLowerCase()).pipe(
      catchError(this.handleError('getAllForms', null)),
      tap(data => console.log('I am the tapped data',data)
      ));
  }


  /**
   * Gets a variable list of subcategories 
   * @param path The extracted path, ie equipment or tool
   */
  getSubCat(path: string): Observable<string[]> {
    return this.http.get<string[]>(pythonURL + '/subcatlist/' + path).pipe(
      catchError(this.handleError('getSubCat', [''])),
      tap(data => console.log(data)
      ));
  }

  /**
   * Gets a list of all possible Tool subcategories
   * @returns string[] of subcategories
   */
  getTools(): Observable<string[]> {
    return this.http.get<string[]>(pythonURL + '/subcatlist/tools').pipe(
      catchError(this.handleError('getTools', [''])),
      tap(data => console.log(data)
      ));
  }

  /**
   * Gets a list of all possible Equipment subcategories
   * @returns string[] of subcategories
   */
  getEquipment(): Observable<string[]> {
    return this.http.get<string[]>(pythonURL + '/subcatlist/equipment').pipe(
      catchError(this.handleError('getEquipment', [''])),
      tap(data => console.log(data)
      ));
  }

  /**
   * Gets a list of all possible Landscape subcategories
   * @returns string[] of subcategories
   */
  getLandscape(): Observable<string[]> {
    return this.http.get<string[]>(pythonURL + '/subcatlist/landscape').pipe(
      catchError(this.handleError('getLandscape', [''])),
      tap(data => console.log(data)
      ));
  }

  /**
   * @param input - A completed form object without a formid
   * @returns - The assigned formid or 0 if unsuccessful
   * 
   */
  addForm(input: Form): Observable<any> {
    var route = pythonURL + '/' + 'form/' + input.category.toLowerCase() + '/' + input.subcat.toLowerCase();
    //Identifying why it returns a 201 response but 404 in the body
    var testForm = { 
    category: 'doibreakthegame', 
    cost: "99.99", 
    date: '2018-06-18', 
    item: 'asdasd', 
    maint_date: '2018-12-18', 
    name: 'asasd', 
    notes: 'asdasd', 
    purpose: 'asdasdasd', 
    repeat: '6', 
    serial: 'asdasd', 
    attach: []
  };

    var sillyForm = {
      category: input.category,
      cost: input.cost,
      date: input.date,
      item: input.item,
      maint_date: input.maint_date,
      name: input.name,
      notes: input.notes,
      purpose: input.purpose,
      repeat: input.repeat,
      serial: input.serial,
      attach: []
    }
    console.log('RIGHT BEFORE CLEAN ATTACH', input);

    input.attach = this.cleanAttach(input.attach);
    console.log('Cleaned attachment before sending to python', input);
    return this.http.post(route, input).pipe(
      catchError(this.handleError('addForm', 0)),
      tap(data => console.log(data)
      ));
  }

  /**
   * Delete the form
   * @param input The form to be deleted
   */
  deleteForm(input: Form): Observable<any> {
    var route = pythonURL + '/form/' +
      input.category + '/' +
      input.subcat + '/' +
      input.form_id;
    return this.http.delete(route).pipe(
      catchError(this.handleError('deleteForm')),
      tap(data => console.log(data)
      ));
  }


  /**
   * Adds a new subcategory to the database under a parent category
   * @param cat - The category to be placed under
   * @param input - The name of the category
   */
  addSubcategory(cat: string, input: string): Observable<Object> {
    var route = pythonURL + '/' + cat.toLowerCase() + '/sub/' + input;
    return this.http.post(route, {}, { responseType: "text" }).pipe(
      catchError(this.handleError('addSubcateogry')),
      tap(data => console.log(data)
      ));
  }

  /**
   * replaces the DB version of the provided form based on form id.
   * @param input - The updated form, this form's FID will be extracted and all fields updated
   */
  updateForm(input: Form): Observable<any> {
    var route = pythonURL + '/form/' +
      input.category + '/' +
      input.subcat + '/' +
      input.form_id;

    input.attach = this.cleanAttach(input.attach);
    console.log('Cleaned attachment before sending to python', input);
    return this.http.put(route, input);
  }

  

  /**
   * Deletes the subcategory according to this path. ASSUMES frontend did check
   * Very destructive, be careful
   * @param cat The category
   * @param sub The subcategory to be deleted
   */
  deleteSubcategory(cat: string, sub: string): Observable<any> {
    var route = pythonURL 
    + '/deletesubcat/' +
    cat + '/' +
    sub;

    return this.http.delete(route).pipe(
      catchError(this.handleError('deleteSubcategory'))
    );
      
  }

  testForm(): Observable<any> {
    var testForm = { category: 'doibreakthegame', cost: "99.99", date: '2018-06-18', item: 'asdasd', maint_date: '2018-12-18', name: 'asasd', notes: 'asdasd', purpose: 'asdasdasd', repeat: '6', serial: 'asdasd', attach: []};
    var route = pythonURL + '/' + 'form/equipment/computer'
    return this.http.post<number>(route, testForm).pipe(
      catchError(this.handleError('addForm', 0)),
      tap(data => console.log(data)
      ));
  }

  getQuick(cat: string): Observable<QuickResponse> {
    var route = pythonURL + '/quickaccess/' + cat;
    return this.http.get<QuickResponse>(route).pipe(
      catchError(this.handleError('getQuick' + cat, { 0: [], 1: 400 })),
      tap(data => console.log(data)
      ));
  }

  getQuickTool(): Observable<QuickResponse> {
    return this.getQuick('tool');
  }

  getQuickEquip(): Observable<QuickResponse>{
    return this.getQuick('equipment');
  }

  getQuickLand(): Observable<QuickResponse>{
    return this.getQuick('landscape');
  }

  openFile(input: Form, filename: string): Observable<any> {
    var route = pythonURL +
    '/openfile/' +
    input.category.toLowerCase() + '/' +
    input.subcat.toLowerCase() + '/' +
    input.form_id.toString() + '/' +
    filename;

    return this.http.get(route).pipe(
      catchError(this.handleError('openFile')),
      tap(data => console.log(data)
    ));
  }

  backup( filepath: string): Observable<any> {
    var route = pythonURL + '/backup'
    return this.http.post(route, { path: this.cleanPath(filepath)}).pipe(
      catchError(this.handleError('backup')),
      tap(data => console.log(data)
    ));;
  }

  restore( filepath: string): Observable<any> {
    var route = pythonURL + '/restore'
    return this.http.post(route, { path: this.cleanPath(filepath)}).pipe(
      catchError(this.handleError('restore')),
      tap(data => console.log(data)
    ));;
  }

  //Credit to https://stackoverflow.com/questions/222309/calculate-last-day-of-month-in-javascript
  //https://stackoverflow.com/users/658303/lebreeze
  //Really should migrate to momentJS instead of my hacky implementation in javascript
  daysInMonth(iMonth: number, iYear: number): number {
    return 32 - new Date(iYear, iMonth, 32).getDate();
  }

  getEvents(month: Date): Observable<EventResponse> {
    //Javascript Date indexes by 0 for months
    var calcDay = this.daysInMonth(month.getMonth(), month.getFullYear());
    var firstDay = month.getFullYear() + '-' + (month.getMonth()+1) + '-' + '1';
    var lastDay  = month.getFullYear() + '-' + (month.getMonth()+1) + '-' + calcDay;
    var route = pythonURL + '/getevents/' +
    firstDay + '/' +
    lastDay;

    return this.http.get<EventResponse>(route).pipe(
      catchError(this.handleError('getEvents', null)),
      tap(data => console.log('Calendar data',data)
      ));

  }

  getPM(cat: string, subcat: string): Observable<PMResponse> {
    //{{url}}/preventative_maint/equipment/newsubcat
    return this.http.get<PMResponse>(pythonURL + '/preventative_maint/' + cat.toLowerCase() + '/' + subcat.toLowerCase()).pipe(
      catchError(this.handleError('getPM', { 0: [], 1: 404 })),
      tap(data => console.log('GetPM',data)
      ));
  }


  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);

    };
  }


}

