import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { API_URL } from 'src/app/shared/utils/constants.utility';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly baseUrl: string = API_URL;

  constructor(private readonly http: HttpClient) {}

  // GET
  getAllUser(params?: Params): Observable<any> {
    return this.http.get(`${this.baseUrl}user`, { params });
  }

  // GETID
  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}user/${id}`);
  }

  // POST
  createUser(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}auth/signup`, data);
  }

  // PUT
  updateUser(data: any): Observable<any> {
    console.log('🚀 ~ UserService ~ updateUser ~ data:', data);
    return this.http.put<any>(`${this.baseUrl}user/${data.id}`, data);
  }

  changeStatus(id: number): Observable<void> {
    return this.http.patch<any>(`${this.baseUrl}user/changeStatus/${id}`, {});
  }

  // PATCH
  changeProfile(id: number, idProfile: number): Observable<void> {
    return this.http.patch<any>(`${this.baseUrl}user/updateProfile/${id}`, {
      profileId: idProfile
    });
  }

  changePhotoProfile(id: number, data: any): Observable<any> {
    return this.http.patch<any>(
      `${this.baseUrl}user/changePhotoProfile/${id}`,
      data
    );
  }
}
