import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsRecipyComponent } from './details-recipy/details-recipy.component';
import { RecepiesListComponent } from './recepies-list/recepies-list.component';

const routes: Routes = [
  { path: 'details', component: DetailsRecipyComponent },
  { path: '', component: RecepiesListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
