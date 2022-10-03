import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, concatMap, tap } from 'rxjs/operators';

import { Recipe } from '../data/Recipe';
import { RecipeService } from '../services/recipe-service/recipe.service';
import { SharedDataService } from '../services/share-data/shared-data.service';

@Component({
  selector: 'app-edit-recipy',
  templateUrl: './edit-recipy.component.html',
  styleUrls: ['./edit-recipy.component.scss'],
})
export class EditRecipyComponent implements OnInit {
  recipyForm = new FormGroup({
    title: new FormControl(''),
    ingredients: new FormControl(''),
    cookingTime: new FormControl(''),
    prepTime: new FormControl(''),
    steps: new FormControl(''),
    rating: new FormControl(''),
    imageUrl: new FormControl(''),
  });

  currentRate = 0;
  valueChanges$?: Observable<Recipe>;
  valueChanges2$ = this.recipyForm.valueChanges.pipe(
    tap((x) => console.log(x))
  );

  selectedRecipy$ = this.shareService.selectedRecipeAction$.pipe(
    tap((user) => {
      this.recipyForm.patchValue(user);
      console.log(user);
      if (user.rating) this.currentRate = user.rating;
    })
  );

  saveSuccess(result: any) {
    console.log('Saved successfully');
  }
  constructor(
    private recipeService: RecipeService,
    private shareService: SharedDataService
  ) {}

  ngOnInit(): void {}

  editRecipy(id?: number) {
    this.valueChanges$ = this.recipeService
      .editRecipe(this.recipyForm.value, id)
      .pipe(
        catchError((errors) => of(errors)),
        tap((result) => this.saveSuccess(result))
      );
  }
}
