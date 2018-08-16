import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'angular-calendar';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import { AppComponent } from './app.component';
import { HamburgerComponent } from './hamburger/hamburger.component';
import { HamlistComponent } from './hamlist/hamlist.component';
import { MainpageComponent } from './mainpage/mainpage.component';

import { AppRoutingModule } from './app-routing.module';
import { AdditemformComponent } from './additemform/additemform.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { TabularComponent } from './tabular/tabular.component';
import { TestComponent } from './test/test.component';
import { CalendarComponent } from './calendar/calendar.component';
import { SubcategoryComponent } from './subcategory/subcategory.component';

import { FlatpickrModule } from 'angularx-flatpickr';
import { MatTableModule, MatTableDataSource, MatSortModule, MatPaginatorModule } from '@angular/material/';
import { DashService } from './dash.service'
import { DummyService } from './dummy.service';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { SearchResultComponent } from './search-result/search-result.component';


@NgModule({
  declarations: [
    AppComponent,
    HamburgerComponent,
    HamlistComponent,
    MainpageComponent,
    AdditemformComponent,
    SearchBarComponent,
    TestComponent,
    TabularComponent,
    AdditemformComponent,
    CalendarComponent,
    SubcategoryComponent,
    BreadcrumbComponent,
    SearchResultComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot(),
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    NgbModule.forRoot()
  ],
  providers: [ {provide: DashService, useClass: DummyService }],
  bootstrap: [AppComponent]
})
export class AppModule { }
