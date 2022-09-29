import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../services/share-data/shared-data.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  filterOptions$ = this.shareData.showFilterOptions$;
  filterName: string = 'Show filters';
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
}
