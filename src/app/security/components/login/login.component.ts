import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { BlockUIService } from 'src/app/shared/services/blockUI/block-ui.service';
import { FormErrorService } from 'src/app/shared/services/formError/form-error.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { DecodeTokenService } from 'src/app/shared/services/token/decode-token.service';
import { CookieUtil } from 'src/app/shared/utils/CookieUtil';
import { AuthService } from '../../service/auth/auth.service';
import { Router } from '@angular/router';

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
    private formErrorService: FormErrorService,
    private blockUIService: BlockUIService,
    private router: Router
  ) {}

  hide = true;
  toastMessage: string = '';
  toastType: 'success' | 'error' | 'warning' | 'info' = 'info';

  loginForm = this.validatorForm.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  onSubmit() {
    if (this.loginForm.valid) {
      this.blockUIService.start();
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
          this.loginForm.reset();
          this.blockUIService.stop();
          this.toastService.showSuccessToast(
            this.translate.instant('success.Login')
          );
          this.router.navigate(['/home']);
        },
        error: () => {
          this.blockUIService.stop();

          this.toastService.showErrorToast(
            this.translate.instant('errors.badCredentials')
          );
        }
      });
    }
  }

  getErrorMessage(controlName: string) {
    return this.formErrorService.getErrorMessage(this.loginForm, controlName);
  }
}
