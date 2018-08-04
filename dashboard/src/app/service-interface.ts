import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot } from '../../node_modules/@angular/router';
import { Form } from './form'

export interface ServiceInterface {


}

@Injectable()
export abstract class aaaa {
    
    abstract getFormFromRoute(route: ActivatedRouteSnapshot, id: number): Observable<Form>

    abstract getForm(cat: string, sub: string, id: number): Observable<Form>

    abstract getAllForms(cat: string, sub: string): Observable<Form[]> 

    abstract getTools(): Observable<string[]> 
    
    abstract getEquipment(): Observable<string[]> 
    
    abstract getLandscape(): Observable<string[]> 

    abstract addForm(input: Form): Observable<number>   

    abstract addSubcategory(cat: string, input: string): Observable<Object>
    
}
