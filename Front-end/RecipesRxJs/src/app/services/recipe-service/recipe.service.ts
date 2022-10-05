import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from 'src/app/data/Recipe';
import {
  flatMap,
  find,
  catchError,
  Observable,
  of,
  ReplaySubject,
  share,
  tap,
  map,
} from 'rxjs';
import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { NotificationService } from '../notification-service/notification.service';
const BASE_PATH = 'http://localhost:4000';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor(
    private http: HttpClient,
    private notification: NotificationService
  ) {}

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

  isRecipyAlreadyExists(title: string): Observable<any> {
    return this.getListOfRecipes().pipe(
      flatMap((users) => users),
      find((e) => e.title?.toLowerCase() === title.toLowerCase()),
      catchError((err) => of(false))
    );
  }
  editRecipe(recipe: Recipe, id?: number): Observable<Recipe> {
    return this.http.put<Recipe>(
      `http://localhost:4000/recipies/${id}`,
      recipe
    );
  }
  addNewRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http
      .post<Recipe>(`http://localhost:4000/recipies`, recipe)
      .pipe(
        tap((x) => console.log(x)),
        catchError((err) => {
          this.notification.setErrorMessage(err);
          return of();
        })
      );
  }
  public uploadImage(image: File, fileToUpload?: File): Observable<any> {
    /* Not possible to do with JSON server*/

    const formData = new FormData();
    formData.append('image', image);
    formData.append('fileToUpload', fileToUpload as File);
    //return this.http.post(`${BASE_PATH}/upload`, formData);
    return of('good');
  }

  private checkIfUsernameExists(username: string): Observable<any> {
    return this.isRecipyAlreadyExists(username);
  }
  usernameValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.checkIfUsernameExists(control.value).pipe(
        map((res) => {
          console.log(res);
          return res ? { titleExists: true } : null;
        })
      );
    };
  }
}
