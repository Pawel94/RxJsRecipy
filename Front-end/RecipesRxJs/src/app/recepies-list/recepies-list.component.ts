import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { combineLatest } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Recipe } from '../data/Recipe';
import { RecipeService } from '../services/recipe-service/recipe.service';
import { SharedDataService } from '../services/share-data/shared-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryEnum } from '../data/CategoryEnum';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-recepies-list',
  templateUrl: './recepies-list.component.html',
  styleUrls: ['./recepies-list.component.scss'],
})
export class RecepiesListComponent implements OnInit {
  constructor(
    private recipeService: RecipeService,
    private shareData: SharedDataService,
    private router: Router,
    config: NgbRatingConfig
  ) {
    config.readonly = true;
  }
  isFilterSet: boolean = false;
  filtredRecipes: Recipe[] = [];
  filterName: string = 'Show filters';
  recipes$: Observable<Recipe[]> = this.recipeService.getListOfRecipes();
  filterRecipesAction$ = this.shareData.filterRecipesAction$;
  filterOptions$ = this.shareData.showFilterOptions$;
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

  filterState(): boolean {
    return this.isFilterSet;
  }
  getClass(): string {
    return this.isFilterSet ? 'col-9' : 'col-12';
  }

  editRecipy(receipy: any) {
    console.log('ads');
    this.shareData.updateSelectedRecipe(receipy);
    this.router.navigate(['/details']);
  }

  setCategory(item: Recipe): string {
    if (item.category === null || item.category === undefined) {
      return CategoryEnum.NONE;
    } else return item.category;
  }

  setRating(item: Recipe): number {
    if (item.rating) return item.rating;
    else return 0;
  }
}
