import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth/auth.service'; // Importa el servicio de autenticación
import { TranslateService } from '@ngx-translate/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { DecodeTokenService } from 'src/app/shared/services/token/decode-token.service';
import { CookieUtil } from 'src/app/shared/utils/CookieUtil';
import { FormErrorService } from 'src/app/shared/services/formError/form-error.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(
    private validatorForm: FormBuilder,
    private authService: AuthService,
    private translate: TranslateService,
    private toastService: ToastService,
    private decodeTokenService: DecodeTokenService,
    private formErrorService: FormErrorService
  ) {}

  @BlockUI() blockUI!: NgBlockUI;
  hide = true;
  toastMessage: string = '';
  toastType: 'success' | 'error' | 'warning' | 'info' = 'info';

  loginForm = this.validatorForm.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  onSubmit() {
    if (this.loginForm.valid) {
      this.blockUI.start('Cargando...');
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
          this.blockUI.stop();

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
    return this.formErrorService.getErrorMessage(this.loginForm, controlName);
  }
}
