import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecepiesListComponent } from './recepies-list/recepies-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FilterRecipesComponent } from './filter-recipes/filter-recipes.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DetailsRecipyComponent } from './details-recipy/details-recipy.component';
import { RecipeCreationComponent } from './recipe-creation/recipe-creation.component';
import { EditRecipyComponent } from './edit-recipy/edit-recipy.component';

@NgModule({
  declarations: [
    AppComponent,
    RecepiesListComponent,
    FilterRecipesComponent,
    NavbarComponent,
    DetailsRecipyComponent,
    RecipeCreationComponent,
    EditRecipyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
