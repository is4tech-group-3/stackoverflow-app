import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastState = new BehaviorSubject<{ message: string; type: 'success' | 'error' | 'warning' | 'info' }>({
    message: '',
    type: 'info',
  });

  toastState$ = this.toastState.asObservable();

  showToast(message: string, type: 'success' | 'error' | 'warning' | 'info') {
    this.toastState.next({ message, type });
  }

  clearToast() {
    this.toastState.next({ message: '', type: 'info' });
  }
}
