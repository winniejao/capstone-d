import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ActivatedRouteSnapshot } from '../../node_modules/@angular/router';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const pythonURL = 'http://127.0.0.1:5000';

export interface Form {
  formid: number;
  subcat: string;
  name: string;
  item: string;
  purpose: string;
  cost: number;
  serial: string;
  date: string;
  attachment: string;
  notes: string;
}

@Injectable({
  providedIn: 'root'
})

export class DashService {


  private readonly webURL = 'https://b7d795f9-3d11-416b-ab01-62de1c4baeae.mock.pstmn.io/api';
  //private readonly pythonURL = 'http://127.0.0.1:5000';
  constructor(private http: HttpClient) { }

  getTestWeb(): Observable<String> {
    return this.http.get(this.webURL, {responseType: 'text'}).pipe(
      catchError(this.handleError('getTestWeb', '')),
      tap(data => console.log(data),
    ));
  } 

  /**
   * @todo Figure out the difference between responseType and content type with the headers
   * I should need to do app/json somewhere I think instead of text
   */
  getTestPython(): Observable<String> {
    return this.http.get(pythonURL, {responseType: 'text'}).pipe(
      catchError(this.handleError('getTestPython', '')),
      tap(data => console.log(data),
    ));
  }

  /**
   * Gets a specific form based on its ID. This version extracts the route for you
   * @param route - ActivatedRouteSnapshot of your current location
   * @param id - The form ID number
   */
  getForm(route: ActivatedRouteSnapshot, id: number): Observable<Object> {
    return this.http.get<Form>(pythonURL + '/subcatlist/tools').pipe(
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
  getForm(cat: string, sub: string, id: number): Observable<Object> {
    return this.http.get<Form>(pythonURL + '/subcatlist/tools').pipe(
      catchError(this.handleError('getForm', undefined)),
      tap(data => console.log(data)
    )); 
  }

  /**
   * @todo Do better route construction than this
   */
  getTools(): Observable<string[]> {
    return this.http.get<string[]>(pythonURL + '/subcatlist/tools').pipe(
      catchError(this.handleError('getForm', [''])),
      tap(data => console.log(data)
    )); 
  }

  getEquipment(): Observable<string[]> {
    return this.http.get<string[]>(pythonURL + '/subcatlist/equipment').pipe(
      catchError(this.handleError('getForm', [''])),
      tap(data => console.log(data)
    )); 
  }

  getLandscape(): Observable<string[]> {
    return this.http.get<string[]>(pythonURL + '/subcatlist/landscape').pipe(
      catchError(this.handleError('getForm', [''])),
      tap(data => console.log(data)
    )); 
  }



/**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
 
    console.log(`${operation} failed: ${error.message}`);
    return of(result as T);

    };
  }


}
