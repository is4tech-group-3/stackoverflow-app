import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../components/users/users.component';
import { API_URL } from 'src/app/shared/utils/constants.utility';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userApiUrl = `${API_URL}user`;
  private authApiUrl = `${API_URL}auth/signup`;

  constructor(private http: HttpClient) {}

  // GET
  getUsersPaginated(page: number, size: number): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get(`${this.userApiUrl}`, { params }); // Cambiar baseUrl a userApiUrl
  }
  
  findUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${this.userApiUrl}/findByEmail/${email}`);
  }

  // GETID
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.userApiUrl}/${id}`);
  }

  // POST
  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.authApiUrl, user);
  }

  // PUT
  updateUser(id: number, user: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.userApiUrl}/${id}`, user); 
  }
  


  // DELETE
  deleteUser(id: number): Observable<void> {
    console.log(`Eliminando usuario con ID: ${id}`);
    return this.http.delete<void>(`${this.userApiUrl}/${id}`);
  }
  

  // PUT: Habilitar/Deshabilitar user
  toggleUserStatus(id: number, status: boolean): Observable<any> {
    return this.http.put(`${this.userApiUrl}/${id}/status`, { status });
  }
}
