import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../services/share-data/shared-data.service';

@Component({
  selector: 'app-details-recipy',
  templateUrl: './details-recipy.component.html',
  styleUrls: ['./details-recipy.component.scss'],
})
export class DetailsRecipyComponent implements OnInit {
  constructor(private shareService: SharedDataService) {}

  selectedRecipy$ = this.shareService.selectedRecipeAction$;
  ngOnInit(): void {}
}
