import { Injectable } from '@angular/core';
import { API_URL } from 'src/app/shared/utils/constants.utility';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = API_URL;

  constructor(private http: HttpClient) {}

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
}
