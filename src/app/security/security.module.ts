import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { EmailComponent } from './forgot-password/email/email.component';
import { PasswordChangeComponent } from './forgot-password/password-change/password-change.component';
import { StepsModule } from 'primeng/steps';
import { ReactiveFormsModule } from '@angular/forms';
import { SecurityRoutingModule } from './security.routing.module';
@NgModule({
  declarations: [
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    EmailComponent,
    PasswordChangeComponent
  ],
  imports: [
    StepsModule,
    CommonModule,
    ReactiveFormsModule,
    SecurityRoutingModule,
  ]
})
export class SecurityModule { }
