import { Injectable } from '@angular/core';
import { DATA_URL } from 'src/app/shared/utils/constants.utility';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  private baseUrl: string = DATA_URL;
  constructor(private http: HttpClient) {}

  create(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}publication`, data);
  }

  getAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}publication`);
  }

  getById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}publication/${id}`);
  }

  update(id: string, data: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}publication/${id}`, data);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}publication/${id}`);
  }
}
