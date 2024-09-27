import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    MatNativeDateModule,
    MatDatepickerModule,  
  ],
  exports: [NavbarComponent]
})
export class SharedModule { }
