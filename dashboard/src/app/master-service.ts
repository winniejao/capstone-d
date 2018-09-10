import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot } from '../../node_modules/@angular/router';
import { Form } from './form'
import { SearchBarComponent } from './search-bar/search-bar.component';

export interface MasterService {
    getFormFromRoute(route: ActivatedRouteSnapshot, id: number): Observable<Form>

    search(target: string): Observable<Form[]>

    getForm(cat: string, sub: string, id: number): Observable<SingleResponse>

    getAllForms(cat: string, sub: string): Observable<ArrayResponse>

    getTools(): Observable<string[]> 

    getSubCat(path: string): Observable<string[]>
    
    getEquipment(): Observable<string[]> 
    
    getLandscape(): Observable<string[]> 

    addForm(input: Form): Observable<number>
    
    deleteForm(input: Form): Observable<any>

    addSubcategory(cat: string, input: string): Observable<any>

    updateForm(input: Form): Observable<any>
    
    deleteSubcategory(cat: string, sub: string): Observable<any>

    getQuickTool(): Observable<QuickResponse>

    getQuickEquip(): Observable<QuickResponse>

    getQuickLand(): Observable<QuickResponse>

    openFile(input: Form, filename: string): Observable<any>

    backup( path: string): Observable<any>

    restore( path: string): Observable<any>

    getEvents(month: Date): Observable<EventResponse>

    getPM(cat: string, subcat: string): Observable<PMResponse>
}

//This is the shape and name I'm getting from the python server
//A better naming convention be a nice refactor if time allowed
export interface ArrayResponse {
    0: Form[];
    1: number;
  }

export interface SingleResponse {
    0: Form;
    1: number;
}

export interface EventResponse {
    0: { Equipment: Form[], Landscape: Form[], Tools: Form[] }
    1: number;
}

export interface QuickResponse {
    0: string[];
    1: number;
}

export interface PMForm {
    form_id: number;
    maint_date: string;
    name: string;
    repeat: number;
}

export interface PMResponse {
    0: PMForm[];
    1: number;
}
