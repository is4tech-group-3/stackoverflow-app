import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DATA_URL } from 'src/app/shared/utils/constants.utility';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {
  private baseUrl = `${DATA_URL}answer`;

  constructor(private http: HttpClient) {}

  // PUT: Actualizar respuesta por ID
  updateAnswer(idAnswer: number, answer: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${idAnswer}`, answer);
  }

  // DELETE: Eliminar respuesta por ID
  deleteAnswer(idAnswer: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${idAnswer}`);
  }

  // GET: Obtener respuestas por ID de pregunta
  getAnswersByQuestion(idQuestion: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${idQuestion}`);
  }

  // POST: Crear respuesta para una pregunta
  createAnswer(idQuestion: number, answer: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/${idQuestion}`, answer);
  }

  // PATCH: Marcar una respuesta como verificada
  verifyAnswer(idQuestion: number, idAnswer: number): Observable<any> {
    return this.http.patch(
      `${this.baseUrl}/verified/${idQuestion}/${idAnswer}`,
      {}
    );
  }

  // PATCH: Desmarcar una respuesta como verificada
  unverifyAnswer(idQuestion: number, idAnswer: number): Observable<any> {
    return this.http.patch(
      `${this.baseUrl}/unverified/${idQuestion}/${idAnswer}`,
      {}
    );
  }

  // GET: Obtener respuestas verificadas por ID de pregunta
  getVerifiedAnswersByQuestion(idQuestion: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/verifiedByQuestion/${idQuestion}`);
  }

  // GET: Obtener respuesta por ID de respuesta
  getAnswerById(idAnswer: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/findById/${idAnswer}`);
  }
}
