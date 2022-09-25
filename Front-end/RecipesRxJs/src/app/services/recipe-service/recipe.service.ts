import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from 'src/app/data/Recipe';
import { BehaviorSubject, catchError, Observable, of } from 'rxjs';
const BASE_PATH = 'http://localhost:4000';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor(private http: HttpClient) {}

  private filterRecipeSubject$ = new BehaviorSubject<Recipe>({ title: '' });
  filterRecipesAction$ = this.filterRecipeSubject$.asObservable();

  getListOfRecipes(): Observable<Recipe[]> {
    return this.http
      .get<Recipe[]>(`${BASE_PATH}/recipies`)
      .pipe(catchError((err) => of([])));
  }

  setFilterForRecipe(filter: any) {
    this.filterRecipeSubject$.next(filter);
  }
}
