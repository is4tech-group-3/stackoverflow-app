import { Component } from '@angular/core';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent {
  options: { label: string; value: number }[]; 
  rows2: number; 
  first2: number = 0; 

  constructor() {
    this.options = [
      { label: '10', value: 10 },
      { label: '20', value: 20 },
      { label: '30', value: 30 }
    ];
    this.rows2 = this.options[0].value; 
  }

  onPageChange2(event: any) {
    this.first2 = event.first; 
  }
}
