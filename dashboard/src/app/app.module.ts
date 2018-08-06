import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HamburgerComponent } from './hamburger/hamburger.component';
import { HamlistComponent } from './hamlist/hamlist.component';
import { MainpageComponent } from './mainpage/mainpage.component';

import { AppRoutingModule } from './app-routing.module';
import { AdditemformComponent } from './additemform/additemform.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { TabularComponent } from './tabular/tabular.component';
import { TestComponent } from './test/test.component';

import { MatTableModule, MatTableDataSource, MatSortModule, MatPaginatorModule } from '@angular/material/';

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
    AdditemformComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
