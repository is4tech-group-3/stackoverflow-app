import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { AuthService } from '../../service/auth/auth.service';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  constructor(
    private validatorForm: FormBuilder,
    private translate: TranslateService,
    private toastService: ToastService,
    private authService: AuthService
  ) {}

  changePasswordForm = this.validatorForm.group({
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required]]
  });

  hide: boolean = true;

  onSubmit() {
    if (this.changePasswordForm.valid) {
      this.authService
        .resetPassword(this.changePasswordForm.value)
        .subscribe({});
    }
  }

  getErrorMessage(controlName: string) {
    const control = this.changePasswordForm.get(controlName);
    const messages: { [key: string]: string } = {
      required: this.translate.instant('errors.required'),
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
