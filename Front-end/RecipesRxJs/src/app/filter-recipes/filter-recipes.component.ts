import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RecipeService } from '../services/recipe-service/recipe.service';
import { SharedDataService } from '../services/share-data/shared-data.service';
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
  constructor(private shareData: SharedDataService) {}

  ngOnInit(): void {}

  onSubmit() {
    console.warn(this.profileForm.value);
    this.shareData.setFilterForRecipe(this.profileForm.value);
  }
}
