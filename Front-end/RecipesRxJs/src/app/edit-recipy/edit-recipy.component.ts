import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, concatMap, tap } from 'rxjs/operators';

import { Recipe } from '../data/Recipe';
import { RecipeService } from '../services/recipe-service/recipe.service';
import { SharedDataService } from '../services/share-data/shared-data.service';
import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { NotificationService } from '../services/notification-service/notification.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-edit-recipy',
  templateUrl: './edit-recipy.component.html',
  styleUrls: ['./edit-recipy.component.scss'],
  animations: [
    trigger('fadeSlideInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(200px)' }),
        animate('800ms', style({ opacity: 1, transform: 'translateX(0)' })),
      ]),
      transition(':leave', [
        animate('1500ms', style({ opacity: 0, transform: 'translateX(10px)' })),
      ]),
    ]),
  ],
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

  constructor(
    private recipeService: RecipeService,
    private shareService: SharedDataService,
    private notification: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  editRecipy(id?: number) {
    this.valueChanges$ = this.recipeService
      .editRecipe(this.recipyForm.value, id)
      .pipe(
        catchError((errors) => of(errors)),
        tap((elements) => {
          this.notification.setSuccessMessage(
            'Saved edited recipy: ' + elements.title
          );
          this.router.navigate(['/']);
        })
      );
  }
}
