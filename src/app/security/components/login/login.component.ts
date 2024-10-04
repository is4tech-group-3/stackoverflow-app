import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth/auth.service'; // Importa el servicio de autenticación
import { TranslateService } from '@ngx-translate/core';
import { ToastService } from 'src/app/shared/services/toast.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  hide = true;
  toastMessage: string = '';
  toastType: 'success' | 'error' | 'warning' | 'info' = 'info';

  loginForm = this.validatorForm.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  constructor(
    private validatorForm: FormBuilder,
    private authService: AuthService,
    private translate: TranslateService,
    private toastService: ToastService
  ) {}

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response: any) => {
          this.toastService.showToast(
            this.translate.instant('success.Login'),
            'success'
          );
        },
          error: error => {
            this.toastService.showToast(this.translate.instant('errors.badCredentials'), 'error');
          }
      });
    } else {
      console.log('Formulario no válido');
    }
  }

  getErrorMessage(controlName: string) {
    const control = this.loginForm.get(controlName);
    const messages: { [key: string]: string } = {
      required: this.translate.instant('errors.required'),
      email: this.translate.instant('errors.invalidEmail'),
      minlength: this.translate.instant('errors.minLength'),
      pattern: this.translate.instant('errors.pattern')
    };
    if (control && control.errors) {
      const errorKey = Object.keys(control.errors).find(
        key => control.errors![key]
      );
      if (errorKey) {
        return messages[errorKey] || '';
      }
    }
    return '';
  }
}
