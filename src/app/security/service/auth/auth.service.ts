import { Injectable } from '@angular/core';
import { API_URL } from 'src/app/shared/utils/constants.utility';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl: string = API_URL;

  constructor(private readonly http: HttpClient) {}

  signup(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}auth/signup`, data);
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}auth/login`, data);
  }

  recoveryPassword(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}user/password-recovery`, data);
  }

  resetPassword(data: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}user/password-reset`, data);
  }

  changePassword(data: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}user/passwordChange`, data);
  }
}
