import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HamlistComponent } from './hamlist/hamlist.component';

const routes: Routes = [
  { path: 'hamlist', component: HamlistComponent }
];
@NgModule({
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
