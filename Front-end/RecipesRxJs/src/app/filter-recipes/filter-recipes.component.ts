import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RecipeService } from '../services/recipe-service/recipe.service';
@Component({
  selector: 'app-filter-recipes',
  templateUrl: './filter-recipes.component.html',
  styleUrls: ['./filter-recipes.component.scss'],
})
export class FilterRecipesComponent implements OnInit {
  profileForm = new FormGroup({
    title: new FormControl(''),
    keyword: new FormControl(''),
    category: new FormControl(''),
    tags: new FormControl(''),
  });
  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {}

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);
    this.recipeService.setFilterForRecipe(this.profileForm.value);
  }
}
