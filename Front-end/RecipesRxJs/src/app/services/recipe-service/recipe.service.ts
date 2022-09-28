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
  editRecipe(recipe: Recipe, id?: number): Observable<Recipe> {
    console.log(recipe);
    //return this.http.post<Recipe>(`${BASE_PATH}/upload`, recipe);
    return this.http.put<Recipe>(
      `http://localhost:4000/recipies/${id}`,
      recipe
    );
  }
  addNewRecipe(recipe: Recipe): Observable<Recipe> {
    console.log(recipe);
    //return this.http.post<Recipe>(`${BASE_PATH}/upload`, recipe);
    return this.http.post<Recipe>(`http://localhost:4000/recipies`, recipe);
    //  .subscribe(
    //       (val) => {
    //         console.log('POST call successful value returned in body', val);
    //       },
    //       (response) => {
    //         console.log('POST call in error', response);
    //       },
    //       () => {
    //         console.log('The POST observable is now completed.');
    //       }
    //     );
  }
  public uploadImage(image: File, fileToUpload?: File): Observable<any> {
    /* Not possible to do with JSON server*/

    const formData = new FormData();
    formData.append('image', image);
    formData.append('fileToUpload', fileToUpload as File);

    console.log(formData);
    //return this.http.post(`${BASE_PATH}/upload`, formData);
    return of('good');
  }
}
