import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../components/users/users.component'; 

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userApiUrl = 'http://3.144.33.186:8080/api/v1/user';
  private authApiUrl = 'http://3.144.33.186:8080/api/v1/auth/signup';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userApiUrl); // GET
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.authApiUrl, user); // POST
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.userApiUrl}/${id}`); // DELETE
  }

  updateUser(id: number, user: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.userApiUrl}/${id}`, user); // PUT
  }
}
