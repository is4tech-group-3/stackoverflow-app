import { Injectable } from '@angular/core';
import { DATA_URL } from 'src/app/shared/utils/constants.utility';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  private readonly baseUrl: string = DATA_URL;
  constructor(private readonly http: HttpClient) {}

  create(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}publication`, data);
  }

  getAll(params?: Params): Observable<any> {
    return this.http.get(`${this.baseUrl}publication`, { params });
  }

  getById(id: String): Observable<any> {
    return this.http.get(`${this.baseUrl}publication/${id}`);
  }

  update(id: string, data: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}publication/${id}`, data);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}publication/${id}`);
  }
}
