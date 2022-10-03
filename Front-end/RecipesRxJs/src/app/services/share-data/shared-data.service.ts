import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Filter } from 'src/app/data/filter';
import { Recipe } from 'src/app/data/Recipe';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private selectedRecipeSubject = new BehaviorSubject<Recipe>({ title: '' });
  selectedRecipeAction$ = this.selectedRecipeSubject.asObservable();

  private filterRecipeSubject$ = new BehaviorSubject<Recipe>({ title: '' });
  filterRecipesAction$ = this.filterRecipeSubject$.asObservable();

  private showFilterOptionsSubject$ = new BehaviorSubject<boolean>(false);
  showFilterOptions$ = this.showFilterOptionsSubject$.asObservable();

  constructor() {}
  updateSelectedRecipe(recipe: Recipe) {
    this.selectedRecipeSubject.next(recipe);
  }
  setFilterForRecipe(filter: Filter) {
    this.filterRecipeSubject$.next(filter);
  }

  updateFilterOptions(flag: boolean) {
    this.showFilterOptionsSubject$.next(flag);
  }
}
