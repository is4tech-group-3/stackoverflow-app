import { AsyncPipe, CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';

// Angular Material Modules
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
// Translation Module
import { TranslateModule } from '@ngx-translate/core';

// HTTP Module
import { HttpClientModule } from '@angular/common/http';

// Reactive Forms Module
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastComponent } from './components/toast/toast.component';
import { ProfileListComponent } from './components/profile-list/profile-list.component';

// service

@NgModule({
  declarations: [NavbarComponent, ToastComponent, ProfileListComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe,

    // Angular Material Modules
    MatMenuModule,
    MatButtonModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatStepperModule,
    MatProgressSpinnerModule
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe,
    NavbarComponent,
    ToastComponent,

    // Angular Material Modules
    MatMenuModule,
    MatButtonModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatStepperModule
  ]
})
export class SharedModule {}
