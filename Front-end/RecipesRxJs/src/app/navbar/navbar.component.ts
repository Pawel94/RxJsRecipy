import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../services/share-data/shared-data.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import {
  animate,
  animation,
  style,
  transition,
  trigger,
} from '@angular/animations';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [
    trigger('changeText', [
      transition(
        ':enter',
        animation([
          style({
            transform: 'translate(200px,0)',
          }),
          animate(
            '0.3s cubic-bezier(0.59, 0.32, 0.38, 1.13)',
            style({
              transform: 'translate(0)',
            })
          ),
        ])
      ),
      transition(
        ':leave',
        animation([
          style({ transform: 'translate(0)' }),
          animate(
            '0.3s cubic-bezier(0.59, 0.32, 0.38, 1.13)',
            style({
              transform: 'translate(-200px,0)',
            })
          ),
        ])
      ),
    ]),
  ],
})
export class NavbarComponent implements OnInit {
  filterOptions$ = this.shareData.showFilterOptions$;
  filterName: string = 'Show filters';
  addState: 'DEFAULT' | 'ADDED' = 'DEFAULT';
  actualRoute$?: Observable<any>;
  constructor(private shareData: SharedDataService, private router: Router) {}

  ngOnInit(): void {
    this.actualRoute$ = this.router.events.pipe(
      map((event) => {
        if (event instanceof NavigationEnd) {
          return event.url;
        }
        return 'false';
      }),
      filter((val) => val === '/')
    );
  }
  setFilter(flag: boolean | null) {
    if (flag === null) flag = true;
    flag = !flag;
    this.shareData.updateFilterOptions(flag);
    this.setFilterState(flag);
  }
  setFilterState(flag: boolean) {
    flag
      ? (this.filterName = 'Hide filter')
      : (this.filterName = 'Show filters');
  }

  addToCart(): void {
    if (this.addState === 'ADDED') {
      return;
    }
    this.addState = 'ADDED';
    //this.cartService.addToCart(this.product);

    // reset to default state
    // some delay here to simulate some processing time
    // when user clicks on add to cart
    setTimeout(() => {
      this.addState = 'DEFAULT';
    }, 2000);
  }
}
