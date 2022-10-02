import { Component, OnInit } from '@angular/core';
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
class ImageSnippet {
  constructor(public src: string, public file: File) {}
}
@Component({
  selector: 'app-recipe-creation',
  templateUrl: './recipe-creation.component.html',
  styleUrls: ['./recipe-creation.component.scss'],
})
export class RecipeCreationComponent implements OnInit {
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
  constructor(private recipeService: RecipeService) {
    this.enumKeys = Object.keys(this.categoryEnmum);
  }

  ngOnInit(): void {}

  addNewRecipy() {
    this.valueChanges$ = this.recipeService
      .addNewRecipe(this.recipyForm.value)
      .pipe(
        catchError((errors) => of(errors)),
        tap((result) => this.saveSuccess(result))
      );
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);

      this.recipeService.uploadImage(this.selectedFile.file).subscribe(
        (res) => {},
        (err) => {}
      );
    });

    reader.readAsDataURL(file);
  }
}
