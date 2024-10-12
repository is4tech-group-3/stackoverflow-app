import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TAG_URL } from 'src/app/shared/utils/constants.utility';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  private baseUrl = `${TAG_URL}tag`;

  constructor(private http: HttpClient) {}

  // GET: Obtener un tag por ID
  getTagById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  // PUT: Actualizar un tag existente
  updateTag(id: number, tag: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, tag);
  }

  // DELETE: Eliminar un tag por ID
  deleteTag(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  // PATCH: Actualizar parcialmente un tag
  patchTag(id: number, tag: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${id}`, tag);
  }

  // GET: Obtener todos los tags
  getAllTags(page: number): Observable<any> {
    let params = new HttpParams().set('page', page.toString());
    return this.http.get(`${this.baseUrl}`, { params });
  }

  // POST: Crear un nuevo tag
  createTag(tag: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, tag);
  }
}
