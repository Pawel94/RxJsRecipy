import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from 'src/app/data/Recipe';
import {
  BehaviorSubject,
  catchError,
  Observable,
  of,
  ReplaySubject,
  share,
} from 'rxjs';
const BASE_PATH = 'http://localhost:4000';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor(private http: HttpClient) {}

  getListOfRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${BASE_PATH}/recipies`).pipe(
      share({
        connector: () => new ReplaySubject(),
        resetOnRefCountZero: true,
        resetOnError: true,
      }),
      catchError((err) => of([]))
    );
  }
}
