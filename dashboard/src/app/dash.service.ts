import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { TagPlaceholder } from '../../node_modules/@angular/compiler/src/i18n/i18n_ast';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class DashService {

  private mockUrl = 'https://b7d795f9-3d11-416b-ab01-62de1c4baeae.mock.pstmn.io/api';
  constructor(private http: HttpClient) { }

  getTest(): Observable<String> {
    return this.http.get(this.mockUrl, {responseType: 'text'}).pipe(tap(data => console.log(data)));
  } 



}
