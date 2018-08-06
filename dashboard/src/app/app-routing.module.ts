import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainpageComponent } from './mainpage/mainpage.component';
import { AdditemformComponent } from './additemform/additemform.component';
import { TabularComponent } from './tabular/tabular.component';

const routes: Routes = [
  { path: '', redirectTo: '/mainpage', pathMatch: 'full' },
  { path: 'mainpage', component: MainpageComponent },
  { path: 'additemform', component: AdditemformComponent },
  { path: 'sub/tabular', component: TabularComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
