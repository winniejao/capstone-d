import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class DashService {

  private webURL = 'https://b7d795f9-3d11-416b-ab01-62de1c4baeae.mock.pstmn.io/api';
  private pythonURL = 'http://127.0.0.1:5000';
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
    return this.http.get(this.pythonURL, {responseType: 'text'}).pipe(
      catchError(this.handleError('getTestPython', '')),
      tap(data => console.log(data),
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
