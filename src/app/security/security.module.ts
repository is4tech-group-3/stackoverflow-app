import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { EmailComponent } from './forgot-password/email/email.component';
import { PasswordChangeComponent } from './forgot-password/password-change/password-change.component';
import { StepsModule } from 'primeng/steps';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    children: [
      { path: '', redirectTo: 'email', pathMatch: 'full' },
      { path: 'email', component: EmailComponent },
      { path: 'password-change', component: PasswordChangeComponent }
    ]
  },
  { path: 'reset-password', component: ResetPasswordComponent },
];

@NgModule({
  declarations: [LoginComponent, ForgotPasswordComponent, ResetPasswordComponent, EmailComponent, PasswordChangeComponent],
  imports: [
    StepsModule,
    CommonModule,
    ReactiveFormsModule,
    MessagesModule,
    MessageModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class SecurityModule { }
