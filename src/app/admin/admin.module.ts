import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin.routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, AdminRoutingModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: []
})
export class AdminModule {}
