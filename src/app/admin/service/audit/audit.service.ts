import { Injectable } from '@angular/core';
import { AUDIT_URL } from 'src/app/shared/utils/constants.utility';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuditService {
  private readonly baseUrl: string = AUDIT_URL;

  constructor(private readonly http: HttpClient) {}

  get(params?: Params): Observable<any> {
    return this.http.get(`${this.baseUrl}audit`, { params });
  }
}
