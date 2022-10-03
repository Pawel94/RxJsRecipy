import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

import { CategoryEnum } from '../data/CategoryEnum';
import { SharedDataService } from '../services/share-data/shared-data.service';
@Component({
  selector: 'app-filter-recipes',
  templateUrl: './filter-recipes.component.html',
  styleUrls: ['./filter-recipes.component.scss'],
})
export class FilterRecipesComponent implements OnInit {
  profileForm = new FormGroup({
    title: new FormControl(''),
    rating: new FormControl(''),
    category: new FormControl(''),
  });

  category = CategoryEnum;
  enumKeys: any[] = [];
  fakeArray = new Array(10);
  keys = Object.keys;
  constructor(private shareData: SharedDataService) {
    this.enumKeys = Object.keys(this.category);
  }

  ngOnInit(): void {
    this.profileForm.valueChanges.subscribe((val) => {
      console.warn(val);
      this.shareData.setFilterForRecipe(val);
    });
  }

  ngOnDestroy(): void {
    this.profileForm.reset();
  }
}
