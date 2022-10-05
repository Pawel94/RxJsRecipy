import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, concatMap, map, tap } from 'rxjs/operators';
import { CategoryEnum } from '../data/CategoryEnum';
import { Recipe } from '../data/Recipe';
import { RecipeService } from '../services/recipe-service/recipe.service';
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
class ImageSnippet {
  constructor(public src: string, public file: File) {}
}
@Component({
  selector: 'app-recipe-creation',
  templateUrl: './recipe-creation.component.html',
  styleUrls: ['./recipe-creation.component.scss'],
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
export class RecipeCreationComponent implements OnInit, OnDestroy {
  recipyForm = new FormGroup({
    //id: new FormControl(),
    title: new FormControl(
      '',
      [Validators.required],
      [this.recipeService.usernameValidator()]
    ),
    ingredients: new FormControl(''),
    cookingTime: new FormControl(''),
    category: new FormControl(''),
    prepTime: new FormControl(''),
    steps: new FormControl(''),
    rating: new FormControl(''),
    imageUrl: new FormControl(''),
  });

  selectedFile?: ImageSnippet;
  valueChanges$?: Observable<Recipe>;

  currentRate = 0;
  categoryEnmum = CategoryEnum;

  enumKeys: any[] = [];
  saveSuccess(result: any) {
    console.log('Saved successfully');
  }
  constructor(
    private recipeService: RecipeService,
    private notification: NotificationService,
    private router: Router
  ) {
    this.enumKeys = Object.keys(this.categoryEnmum);
  }
  ngOnDestroy(): void {}

  ngOnInit(): void {}

  addNewRecipy() {
    this.valueChanges$ = this.recipeService
      .addNewRecipe(this.recipyForm.value)
      .pipe(
        catchError((errors) => {
          this.notification.setErrorMessage(errors);
          console.log(errors);
          return of();
        }),
        tap((result) => {
          this.saveSuccess(result);
          this.notification.setSuccessMessage('Succes');
          this.router.navigate(['/']);
        })
      );
  }

  processFile(imageInput: any) {
    // const file: File = imageInput.files[0];
    // const reader = new FileReader();

    // reader.addEventListener('load', (event: any) => {
    //   this.selectedFile = new ImageSnippet(event.target.result, file);

    //   this.recipeService.uploadImage(this.selectedFile.file).subscribe(
    //     (res) => {},
    //     (err) => {}
    //   );
    // });

    // reader.readAsDataURL(file);
    console.log("method doesn't work");
  }
}
