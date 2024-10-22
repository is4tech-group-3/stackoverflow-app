import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from '../../services/sesion/session.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastService } from '../../services/toast/toast.service';
@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
    private readonly sessionService: SessionService,
    private readonly router: Router,
    private readonly translateService: TranslateService,
    private readonly toastService: ToastService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> {
    const requiredRoles = route.data['requiredRoles'] as string[];

    if (requiredRoles) {
      const userRoles = this.sessionService.getUserRoles();
      const hasAccess = userRoles.some(role => requiredRoles.includes(role));
      if (!hasAccess) {
        this.translateService
          .get('warning.notPermission')
          .subscribe((message: string) => {
            this.toastService.showWarningToast(message);
          });
        this.router.navigate(['/admin']);
        return false;
      }
    }

    return true;
  }
}
