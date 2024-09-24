import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin.routing.module';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { DropdownModule } from 'primeng/dropdown';
import { PaginatorModule } from 'primeng/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; 
import { MatSelectModule } from '@angular/material/select';
import { UsersComponent } from './users/users.component';
import { UserModalComponent } from './users/user-modal/user-modal.component';


@NgModule({

declarations: [
  UsersComponent,
  UserModalComponent
],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MenubarModule,
    MatTableModule,
    InputTextModule,
    MatPaginatorModule,
    FormsModule,
    PaginatorModule,
    DropdownModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule, 
    MatInputModule,
    MatSelectModule,
    MatOptionModule, 
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdminModule { }