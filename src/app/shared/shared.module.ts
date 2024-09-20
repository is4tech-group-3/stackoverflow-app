// shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [NavbarComponent],
  imports: [
    MatMenuModule,
    MatButtonModule,
    CommonModule,
  ], exports: [NavbarComponent]
})

export class SharedModule { }
