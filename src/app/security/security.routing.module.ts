import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { EmailComponent } from './forgot-password/email/email.component';
import { PasswordChangeComponent } from './forgot-password/password-change/password-change.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        children: [
            { path: '', redirectTo: 'email', pathMatch: 'full' },
            { path: 'email', component: EmailComponent },
            { path: 'reset', component: PasswordChangeComponent }
        ]
    },
    { path: 'reset-password', component: ResetPasswordComponent }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SecurityRoutingModule { }