import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginComponent } from './components/login/login.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { SecurityRoutingModule } from './security.routing.module';
@NgModule({
  declarations: [
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
  ],
  imports: [
    SharedModule,
    SecurityRoutingModule,
  ]
})
export class SecurityModule { }
