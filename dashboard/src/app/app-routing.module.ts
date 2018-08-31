import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainpageComponent } from './mainpage/mainpage.component';
import { CalendarComponent } from './calendar/calendar.component';
import { AdditemformComponent } from './additemform/additemform.component';
import { ViewitemformComponent } from './viewitemform/viewitemform.component';
import { SubcategoryComponent } from './subcategory/subcategory.component';
import { TabularComponent } from './tabular/tabular.component';
import { TestComponent } from './test/test.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { EditFormComponent } from './edit-form/edit-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/mainpage', pathMatch: 'full' },
  { path: 'mainpage', component: MainpageComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'additemform', component: AdditemformComponent },
  { path: 'viewitemform', component: ViewitemformComponent },
  { path: 'editform', component: EditFormComponent },
  { path: 'equipment', component: SubcategoryComponent},
  { path: 'tool', component: SubcategoryComponent},
  { path: 'landscape', component: SubcategoryComponent},
  { path: 'tabular', component: TabularComponent },
  { path: 'searchresult', component: SearchResultComponent },
  { path: 'test', component: TestComponent},
  {   path: 'foo', 
      component: TestComponent,
      children: [
        { path: 'bar/baz', component: TestComponent }
      ]
  },
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
