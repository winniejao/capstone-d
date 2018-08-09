import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabularComponent } from './tabular/tabular.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { CalendarComponent } from './calendar/calendar.component';
import { AdditemformComponent } from './additemform/additemform.component';
import { SubcategoryComponent } from './subcategory/subcategory.component';


const routes: Routes = [
  { path: '', redirectTo: '/mainpage', pathMatch: 'full' },
  { path: 'tabular', component: TabularComponent },
  { path: 'mainpage', component: MainpageComponent },
  { path: 'calendar', component: CalendarComponent },

  { path: 'additemform', component: AdditemformComponent },
  { path: 'equipment', component: SubcategoryComponent},
  { path: 'tool', component: SubcategoryComponent},
  { path: 'landscape', component: SubcategoryComponent},
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
