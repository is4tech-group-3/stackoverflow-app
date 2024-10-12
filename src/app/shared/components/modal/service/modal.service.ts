import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TemplateRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalSubject = new Subject<{ isOpen: boolean; title?: string; content?: TemplateRef<any> }>();
  
  // Observable que los componentes pueden suscribirse
  modalState$ = this.modalSubject.asObservable();

  open(title?: string, content?: TemplateRef<any>) {
    this.modalSubject.next({ isOpen: true, title, content });
  }

  close() {
    this.modalSubject.next({ isOpen: false });
  }
}
