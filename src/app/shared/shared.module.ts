import { AsyncPipe, CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ModalComponent } from './components/modal/modal.component';
import { RouterLink, RouterModule } from '@angular/router';
import { LottieModule } from 'ngx-lottie';

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
import { BlockUIModule } from 'ng-block-ui';

// HTTP Module
import { HttpClientModule } from '@angular/common/http';
import { AvatarModule } from 'ngx-avatars';

// Reactive Forms Module
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastComponent } from './components/toast/toast.component';
import { DateFormatPipe } from './pipe/dateForma/date-format.pipe';
import { DropdownComponent } from './components/dropdown/dropdown/dropdown.component';
import { FooterComponent } from './components/footer/footer.component';

// service

@NgModule({
  declarations: [
    NavbarComponent,
    ToastComponent,
    DateFormatPipe,
    ModalComponent,
    DropdownComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe,
    RouterModule,
    RouterLink,
    LottieModule,
    AvatarModule,
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
    RouterLink,
    RouterModule,
    LottieModule,
    DateFormatPipe,
    ModalComponent,
    BlockUIModule,
    DropdownComponent,
    AvatarModule,
    FooterComponent,
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
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule {}
