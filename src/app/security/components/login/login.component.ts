import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth/auth.service'; // Importa el servicio de autenticación
import { TranslateService } from '@ngx-translate/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { DecodeTokenService } from 'src/app/shared/services/token/decode-token.service';
import { CookieUtil } from 'src/app/shared/utils/CookieUtil';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @BlockUI() blockUI!: NgBlockUI;
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
    private toastService: ToastService,
    private decodeTokenService: DecodeTokenService
  ) {}

  onSubmit() {
    if (this.loginForm.valid) {
      this.blockUI.start('Loading...'); // Bloquea la UI con un mensaje opcional
console.log('🚀 ~ LoginComponent ~ onSubmit ~ this.loginForm.value:', this.loginForm.value)
      this.authService.login(this.loginForm.value).subscribe({
        next: (response: any) => {
          const decodedToken = this.decodeTokenService.DecodeToken(
            response?.token
          );
          CookieUtil.setValue('token', response?.token);
          CookieUtil.setValue('expiration', decodedToken?.exp);
          CookieUtil.setValue('iat', decodedToken?.iat);
          CookieUtil.setValue('sub', decodedToken?.sub);
          CookieUtil.setValue('roles', decodedToken?.roles);

          this.toastService.showSuccessToast(
            this.translate.instant('success.Login')
          );
          this.blockUI.stop();
        },
        error: () => {
          this.toastService.showErrorToast(
            this.translate.instant('errors.badCredentials')
          );
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
