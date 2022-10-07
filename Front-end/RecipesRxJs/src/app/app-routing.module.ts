import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsRecipyComponent } from './details-recipy/details-recipy.component';
import { EditRecipyComponent } from './edit-recipy/edit-recipy.component';
import { RecepiesListComponent } from './recepies-list/recepies-list.component';
import { RecipeCreationComponent } from './recipe-creation/recipe-creation.component';

const routes: Routes = [
  { path: 'details', component: EditRecipyComponent },
  { path: '', component: RecepiesListComponent },
  { path: 'createRecipy', component: RecipeCreationComponent },
  {
    path: 'commons',
    loadChildren: () => import('./common/common.module').then((m) => m.default),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
