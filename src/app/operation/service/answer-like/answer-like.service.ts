import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DATA_URL } from 'src/app/shared/utils/constants.utility';

@Injectable({
  providedIn: 'root'
})
export class AnswerLikeService {
  private baseUrl = `${DATA_URL}answer`;

  constructor(private http: HttpClient) {}

  // POST: Dar like a una respuesta
  likeAnswer(idAnswer: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/like/${idAnswer}`, {});
  }

  // GET: Obtener cantidad de likes de una respuesta
  getLikes(idAnswer: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/likes/${idAnswer}`);
  }

  // DELETE: Eliminar un like (dar dislike) a una respuesta
  dislikeAnswer(idAnswer: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/dislike/${idAnswer}`);
  }
}
