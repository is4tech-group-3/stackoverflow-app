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

    showErrorToast(message: string) {
      this.toastState.next({ message, type: 'error' });
    }

    showWarningToast(message: string) {
      this.toastState.next({ message, type: 'warning' });
    }

    showInfoToast(message: string) {
      this.toastState.next({ message, type: 'info' });
    }

    showSuccessToast(message: string) {
      this.toastState.next({ message, type: 'success' });
    }
    

    clearToast() {
      this.toastState.next({ message: '', type: 'info' });
    }
  }
