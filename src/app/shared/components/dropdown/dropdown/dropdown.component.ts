import { Component, Input, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent {
  @Input() options: string[] = [];
  @Input() placeholder: string = 'Select an option';
  @Output() selected = new EventEmitter<string>();

  isOpen = false;
  selectedOption: string | null = null;

  constructor(private elementRef: ElementRef) {}

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  selectOption(option: string) {
    this.selectedOption = option;
    this.selected.emit(option);
    this.isOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const dropdownElement = this.elementRef.nativeElement.querySelector('.dropdown');

    if (!dropdownElement.contains(target)) {
      this.isOpen = false;
    }
  }
}
