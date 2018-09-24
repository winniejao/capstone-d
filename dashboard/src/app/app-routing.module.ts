import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainpageComponent } from './mainpage/mainpage.component';
import { CalendarComponent } from './calendar/calendar.component';
import { AdditemformComponent } from './additemform/additemform.component';
import { SubcategoryComponent } from './subcategory/subcategory.component';
import { TabularComponent } from './tabular/tabular.component';
import { TestComponent } from './test/test.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { EditFormComponent } from './edit-form/edit-form.component';
import { BackupComponent } from './backup/backup.component';
import { PrevMaintComponent } from './prev-maint/prev-maint.component';
import { DeleteSubComponent } from './delete-sub/delete-sub.component';

const routes: Routes = [
  { path: '', redirectTo: '/mainpage', pathMatch: 'full' },
  { path: 'mainpage', component: MainpageComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'additemform', component: AdditemformComponent },
  { path: 'editform', component: EditFormComponent },
  { path: 'equipment', component: SubcategoryComponent},
  { path: 'tools', component: SubcategoryComponent},
  { path: 'landscape', component: SubcategoryComponent},
  { path: 'tabular', component: TabularComponent },
  { path: 'pm', component: PrevMaintComponent},
  { path: 'delete', component: DeleteSubComponent},
  {
    path: 'searchresult',
    component: SearchResultComponent,
    runGuardsAndResolvers: 'always',
  },
  { path: 'test', component: TestComponent},
  {   path: 'foo', 
      component: TestComponent,
      children: [
        { path: 'bar/baz', component: TestComponent }
      ]
  },
  { path: 'backup', component: BackupComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'}) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
