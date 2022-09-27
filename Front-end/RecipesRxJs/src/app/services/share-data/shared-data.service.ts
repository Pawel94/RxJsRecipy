import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Recipe } from 'src/app/data/Recipe';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private selectedRecipeSubject = new BehaviorSubject<Recipe>({ title: '' });
  selectedRecipeAction$ = this.selectedRecipeSubject.asObservable();

  private filterRecipeSubject$ = new BehaviorSubject<Recipe>({ title: '' });
  filterRecipesAction$ = this.filterRecipeSubject$.asObservable();

  constructor() {}
  updateSelectedRecipe(recipe: Recipe) {
    this.selectedRecipeSubject.next(recipe);
  }
  setFilterForRecipe(filter: any) {
    this.filterRecipeSubject$.next(filter);
  }
}
