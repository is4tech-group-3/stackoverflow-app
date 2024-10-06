import { Component, OnInit } from '@angular/core';
import { ToastService } from '../../services/toast/toast.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  animations: [
    trigger('toastAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate(
          '200ms ease-in',
          style({ opacity: 1, transform: 'translateY(0)' })
        )
      ]),
      transition(':leave', [
        animate(
          '200ms ease-out',
          style({ opacity: 0, transform: 'translateY(-20px)' })
        )
      ])
    ])
  ]
})
export class ToastComponent implements OnInit {
  message = '';
  type: 'success' | 'error' | 'warning' | 'info' = 'info';
  isVisible = false;

  constructor(private toastService: ToastService) {}

  ngOnInit() {
    this.toastService.toastState$.subscribe(toast => {
      if (toast.message) {
        this.message = toast.message;
        this.type = toast.type;
        this.isVisible = true;

        setTimeout(() => this.closeToast(), 4000);
      }
    });
  }

  getIcon() {
    switch (this.type) {
      case 'success':
        return 'check_circle';
      case 'error':
        return 'error';
      case 'warning':
        return 'warning';
      case 'info':
        return 'info';
      default:
        return 'info';
    }
  }

  closeToast() {
    this.isVisible = false;
    this.toastService.clearToast();
  }
}
