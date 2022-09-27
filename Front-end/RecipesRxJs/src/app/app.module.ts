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

@NgModule({
  declarations: [
    AppComponent,
    RecepiesListComponent,
    FilterRecipesComponent,
    NavbarComponent,
    DetailsRecipyComponent,
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
