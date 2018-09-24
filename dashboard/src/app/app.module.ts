import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'angular-calendar';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap/modal/modal.module';
import { NgxElectronModule } from 'ngx-electron';

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
import { FormValidatorDirective } from './form-validator.directive';

import { FlatpickrModule } from 'angularx-flatpickr';
import { MatTableModule, MatTableDataSource, MatSortModule, MatPaginatorModule } from '@angular/material/';
import { ItemfieldsService } from './itemfields.service'
import { PassServiceService } from './pass-service.service'
import { DashService } from './dash.service'
import { DummyService } from './dummy.service';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { ViewitemformComponent } from './viewitemform/viewitemform.component';
import { EditFormComponent } from './edit-form/edit-form.component';
import { BackupComponent } from './backup/backup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PrevMaintComponent } from './prev-maint/prev-maint.component';
import { DeleteSubComponent } from './delete-sub/delete-sub.component';
import { UnderscorePipe } from './mainpage/underscore.pipe';


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
    SearchResultComponent,
    ViewitemformComponent,
    EditFormComponent,
    BackupComponent,
    FormValidatorDirective,
    PrevMaintComponent,
    DeleteSubComponent,
    UnderscorePipe
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    NgbModalModule.forRoot(),
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot(),
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    NgxElectronModule,
    ReactiveFormsModule,
  ],
  providers: [ {provide: DashService, useClass: DashService }, ItemfieldsService, PassServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
