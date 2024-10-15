import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from 'src/app/shared/utils/constants.utility';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private baseUrl = `${API_URL}profile`;

  constructor(private http: HttpClient) {}

  // GET: Obtener todos los perfiles
  getProfiles(page: number): Observable<any> {
    let params = new HttpParams().set('page', page.toString());
    return this.http.get(`${this.baseUrl}`, { params });
  }

  // GET: Obtener perfil por ID
  getProfileById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  // POST: Crear un nuevo perfil
  createProfile(profile: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, profile);
  }

  // PUT: Actualizar un perfil existente
  updateProfile(id: number, profile: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, profile);
  }

  // DELETE: Eliminar un perfil por ID
  deleteProfile(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  // PATCH: Actualizar estado de un perfil
  patchProfile(id: number, profile: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${id}`, profile);
  }
}
