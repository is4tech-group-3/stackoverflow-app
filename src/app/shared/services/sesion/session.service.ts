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
  }
}
