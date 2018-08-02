import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainpageComponent } from './mainpage/mainpage.component';
import { AdditemformComponent } from './additemform/additemform.component';
import { SubcategoryComponent } from './subcategory/subcategory.component';
import { TabularComponent } from './tabular/tabular.component';
import { TestComponent } from './test/test.component';


const routes: Routes = [
  { path: '', redirectTo: '/mainpage', pathMatch: 'full' },
  { path: 'mainpage', component: MainpageComponent },
  { path: 'additemform', component: AdditemformComponent },
  { path: 'equipment', component: SubcategoryComponent},
  { path: 'tool', component: SubcategoryComponent},
  { path: 'landscape', component: SubcategoryComponent},
  { path: 'tabular', component: TabularComponent},
  { path: 'test', component: TestComponent}
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
