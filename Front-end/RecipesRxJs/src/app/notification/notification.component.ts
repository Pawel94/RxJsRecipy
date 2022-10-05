import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { NotificationService } from '../services/notification-service/notification.service';
import { animate, style, transition, trigger } from '@angular/animations';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0.5, transform: 'translateX(500px)' }),
        animate('800ms', style({ opacity: 1, transform: 'translateX(110)' })),
      ]),
      transition(':leave', [
        animate('800ms', style({ opacity: 0, transform: 'translateX(100px)' })),
      ]),
    ]),
  ],
})
export class NotificationComponent implements OnInit {
  successMessage$ = this.notificationService.successMessageSubject$.pipe(
    tap(() => {
      setTimeout(() => {
        this.notificationService.clearSuccessMessage();
      }, 5000);
    })
  );

  errorMessage$ = this.notificationService.errorMessageSubject$.pipe(
    tap(() => {
      setTimeout(() => {
        console.log('das');
        this.notificationService.clearErrorMessage();
      }, 5000);
    })
  );

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {}
}
