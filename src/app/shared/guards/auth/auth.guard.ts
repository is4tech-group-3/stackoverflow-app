// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SessionService } from '../../services/sesion/session.service';
import { ToastService } from '../../services/toast/toast.service';
import { TranslateService } from '@ngx-translate/core';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private sessionService: SessionService,
    private router: Router,
    private toastService: ToastService,
    private translateService: TranslateService
  ) {}

  canActivate(): boolean {
    if (this.sessionService.isLoggedIn()) {
      this.translateService
        .get('warning.alreadyLoggedIn')
        .subscribe((message: string) => {
          this.toastService.showWarningToast(message);
        });
      this.router.navigate(['/home']);
      return false;
    } else {
      return true;
    }
  }
}
