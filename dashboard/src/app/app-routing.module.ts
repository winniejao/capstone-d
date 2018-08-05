import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabularComponent } from './tabular/tabular.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { CalendarComponent } from './calendar/calendar.component';
import { AdditemformComponent } from './additemform/additemform.component';

const routes: Routes = [
  { path: '', redirectTo: '/mainpage', pathMatch: 'full' },
  { path: 'tabular', component: TabularComponent },
  { path: 'mainpage', component: MainpageComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'additemform', component: AdditemformComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
