import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor() {}
  private successMessageSubject = new Subject<string>();
  successMessageSubject$ = this.successMessageSubject.asObservable();

  private errorMessageSubject = new Subject<string>();
  errorMessageSubject$ = this.errorMessageSubject.asObservable();
  messageSuccesForm = 'Successfull: ';
  messageErrorForm = 'Error occured: ';
  setSuccessMessage(message: string) {
    console.log(message);
    if (message !== '') {
      message = this.messageSuccesForm + message;
    }
    this.successMessageSubject.next(message);
  }
  setErrorMessage(message: string) {
    if (message !== '') {
      message = this.messageErrorForm + message;
    }
    this.errorMessageSubject.next(message);
  }

  clearSuccessMessage() {
    this.setSuccessMessage('');
  }
  clearErrorMessage() {
    this.setErrorMessage('');
  }
}
