import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { NotificationService } from '../services/notification-service/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
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
