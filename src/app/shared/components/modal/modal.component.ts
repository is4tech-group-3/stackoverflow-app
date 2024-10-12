import { Component, OnInit, TemplateRef } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';
import { ModalService } from './service/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations: [
    trigger('modalAnimation', [
      state('void', style({ opacity: 0, transform: 'scale(0.95)' })),
      state('*', style({ opacity: 1, transform: 'scale(1)' })),
      transition(':enter', [animate('300ms ease-out')]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'scale(0.9)' })) // Cambiado aquí
      ])
    ])
  ]
})
export class ModalComponent implements OnInit {
  isOpen: boolean = false;
  title: string = 'Título del Modal';
  content?: TemplateRef<any>;

  constructor(private modalService: ModalService) {}

  ngOnInit() {
    this.modalService.modalState$.subscribe(state => {
      this.isOpen = state.isOpen;
      if (state.title) {
        this.title = state.title;
      }
      if (state.content) {
        this.content = state.content;
      }
    });
  }

  close() {
    this.isOpen = false;
    this.modalService.close();
  }

  confirm() {
    this.isOpen = false;
    this.modalService.close();
  }
}
