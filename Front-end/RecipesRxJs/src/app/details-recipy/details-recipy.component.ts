import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../services/share-data/shared-data.service';
import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';
@Component({
  selector: 'app-details-recipy',
  templateUrl: './details-recipy.component.html',
  styleUrls: ['./details-recipy.component.scss'],
  animations: [
    trigger('fadeSlideInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('500ms', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('500ms', style({ opacity: 0, transform: 'translateY(10px)' })),
      ]),
    ]),
  ],
})
export class DetailsRecipyComponent implements OnInit {
  constructor(private shareService: SharedDataService) {}

  selectedRecipy$ = this.shareService.selectedRecipeAction$;
  ngOnInit(): void {}
}
