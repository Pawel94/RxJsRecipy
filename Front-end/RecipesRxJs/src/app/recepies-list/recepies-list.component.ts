import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { combineLatest } from 'rxjs';
import { map, merge, pluck, tap } from 'rxjs/operators';
import { Recipe } from '../data/Recipe';
import { RecipeService } from '../services/recipe-service/recipe.service';
import { SharedDataService } from '../services/share-data/shared-data.service';
import { Router } from '@angular/router';
import { CategoryEnum } from '../data/CategoryEnum';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { Filter } from '../data/filter';
import {
  animate,
  keyframes,
  query,
  stagger,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
@Component({
  selector: 'app-recepies-list',
  templateUrl: './recepies-list.component.html',
  styleUrls: ['./recepies-list.component.scss'],
  animations: [
    trigger('fadeSlideInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('600ms', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('500ms', style({ opacity: 0, transform: 'translateY(10px)' })),
      ]),
    ]),
    trigger('fadeInGrow', [
      transition(':enter', [
        query(':enter', [
          style({ opacity: 0 }),
          stagger('50ms', [animate('500ms', style({ opacity: 1 }))]),
        ]),
      ]),
    ]),
    trigger('listAnimation', [
      transition('* <=> *', [
        query(
          ':enter',
          [
            style({ opacity: 0 }),
            stagger('170ms', animate('600ms ease-out', style({ opacity: 1 }))),
          ],
          { optional: true }
        ),
        query(':leave', animate('200ms', style({ opacity: 0 })), {
          optional: true,
        }),
      ]),
    ]),
  ],
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

  recipes$: Observable<Recipe[]> = this.recipeService.getListOfRecipes();

  filterRecipesAction$ = this.shareData.filterRecipesAction$.pipe(
    map(
      (response) =>
        ({
          title: response.title,
          category: response.category,
          rating: response.rating,
        } as Filter)
    )
  );

  filterOptions$ = this.shareData.showFilterOptions$;

  filtredRecipes$ = combineLatest([
    this.recipes$,
    this.filterRecipesAction$,
  ]).pipe(
    map(([recipes, elementToFilter]: [Recipe[], Filter]) => {
      return recipes.filter(
        (filteredElementList) =>
          filteredElementList.title
            ?.toLowerCase()
            .indexOf(elementToFilter.title?.toLowerCase() ?? '') != -1 &&
          filteredElementList.category
            ?.toLowerCase()
            .indexOf(elementToFilter.category?.toLowerCase() ?? '') != -1 &&
          this.compareRatingsFilter(filteredElementList, elementToFilter)
      );
    })
  );
  ngOnInit(): void {}

  editRecipy(receipy: any) {
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
  private compareRatingsFilter(recipe: Recipe, filter: Filter): any {
    let rateToCompare = 0;
    if (filter.rating === undefined) return recipe;
    if (recipe.rating !== undefined) rateToCompare = recipe.rating;
    if (rateToCompare > filter.rating) return filter;
    else recipe;
  }
}
