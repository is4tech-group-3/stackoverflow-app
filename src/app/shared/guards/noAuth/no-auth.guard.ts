// no-auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SessionService } from '../../services/sesion/session.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastService } from '../../services/toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {
  constructor(
    private sessionService: SessionService,
    private router: Router,
    private toastService: ToastService,
    private translateService: TranslateService
  ) {}

  canActivate(): boolean {
    if (this.sessionService.isLoggedIn()) {
      return true;
    } else {
      this.translateService
        .get('warning.notLoggedIn')
        .subscribe((message: string) => {
          this.toastService.showWarningToast(message);
        });
      this.router.navigate(['auth/login']);
      return false;
    }
  }
}
