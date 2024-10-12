import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from 'src/app/shared/utils/constants.utility';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private baseUrl = `${API_URL}role`;

  constructor(private http: HttpClient) {}

  getRoles(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getRoleById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createRole(role: any): Observable<any> {
    return this.http.post(this.baseUrl, role);
  }

  updateRole(id: number, role: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, role);
  }

  deleteRole(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
