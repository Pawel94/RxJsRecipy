import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { combineLatest } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Recipe } from '../data/Recipe';
import { RecipeService } from '../services/recipe-service/recipe.service';

@Component({
  selector: 'app-recepies-list',
  templateUrl: './recepies-list.component.html',
  styleUrls: ['./recepies-list.component.scss'],
})
export class RecepiesListComponent implements OnInit {
  constructor(private recipeService: RecipeService) {}
  filtredRecipes: Recipe[] = [];

  recipes$: Observable<Recipe[]> = this.recipeService.getListOfRecipes();
  filterRecipesAction$ = this.recipeService.filterRecipesAction$;
  filtredRecipes$ = combineLatest([
    this.recipes$,
    this.filterRecipesAction$,
  ]).pipe(
    map(([recipes, filter]: [Recipe[], Recipe]) => {
      return recipes.filter(
        (recipe) =>
          recipe.title
            ?.toLowerCase()
            .indexOf(filter?.title?.toLowerCase() ?? '') != -1
      );
    })
  );
  ngOnInit(): void {}
}
