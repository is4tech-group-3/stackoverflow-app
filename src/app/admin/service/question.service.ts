import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DATA_URL } from 'src/app/shared/utils/constants.utility';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private baseUrl = `${DATA_URL}question`;

  constructor(private http: HttpClient) {}

  // GET: Obtener todas las preguntas
  getQuestions(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  // GET: Obtener una pregunta por ID
  getQuestionById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  // POST: Crear una nueva pregunta
  createQuestion(question: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, question);
  }

  // PUT: Actualizar una pregunta existente por ID
  updateQuestion(id: number, question: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, question);
  }

  // DELETE: Eliminar una pregunta por ID
  deleteQuestion(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
