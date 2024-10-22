import { Injectable } from '@angular/core';
import { CookieUtil } from 'src/app/shared/utils/CookieUtil';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  isLoggedIn(): boolean {
    const token = CookieUtil.getValue('token');
    return !!token;
  }

  logout(): void {
    CookieUtil.clear();
    window.location.reload();
  }

  getUserRoles(): string[] {
    const roles = CookieUtil.getValue('roles');

    if (roles) {
      try {
        return JSON.parse(roles);
      } catch (error) {
        console.error('Error al parsear roles: ', error);
        return [];
      }
    }

    return [];
  }
}
