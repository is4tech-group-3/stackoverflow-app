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
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; 
import { MatSelectModule } from '@angular/material/select';
import { UsersComponent } from './components/users/users.component';
import { UserModalComponent } from './components/users/user-modal/user-modal.component';
import { AuditComponent } from './components/audit/audit.component';
import { MatDatepickerModule } from '@angular/material/datepicker';


@NgModule({

declarations: [
  UsersComponent,
  UserModalComponent,
  AuditComponent
],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MenubarModule,
    MatTableModule,
    InputTextModule,
    MatDatepickerModule,
    MatNativeDateModule,
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