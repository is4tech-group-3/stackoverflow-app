import { NgModule } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { StepsModule } from 'primeng/steps';
import { ReactiveFormsModule } from '@angular/forms';
import { SecurityRoutingModule } from './security.routing.module';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';

@NgModule({
  declarations: [
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
  ],
  imports: [
    AsyncPipe,
    MatInputModule,
    MatIconModule,
    StepsModule,
    CommonModule,
    ReactiveFormsModule,
    SecurityRoutingModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatStepperModule
  ]
})
export class SecurityModule { }
