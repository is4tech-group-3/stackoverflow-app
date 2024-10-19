import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth/auth.service';
import { FormErrorService } from 'src/app/shared/services/formError/form-error.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { BlockUIService } from 'src/app/shared/services/blockUI/block-ui.service';
import { TranslateService } from '@ngx-translate/core';
import { SessionService } from 'src/app/shared/services/sesion/session.service';
import { CustomValidators } from 'src/app/shared/Validators/validators';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  hideConfirm: boolean = true;
  hideNewPassword: boolean = true;
  hideOldPassword: boolean = true;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly formErrorService: FormErrorService,
    private readonly toastService: ToastService,
    private readonly blockUIService: BlockUIService,
    private readonly translateService: TranslateService,
    private readonly sessionService: SessionService
  ) {}

  passwordChangeForm = this.formBuilder.group(
    {
      oldPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          CustomValidators.containsUpperCaseValidator(),
          CustomValidators.containsLowerCaseValidator(),
          CustomValidators.containsNumberValidator(),
          CustomValidators.containsSpecialCharacterValidator()
        ]
      ],
      newPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          CustomValidators.containsUpperCaseValidator(),
          CustomValidators.containsLowerCaseValidator(),
          CustomValidators.containsNumberValidator(),
          CustomValidators.containsSpecialCharacterValidator()
        ]
      ],
      confirmPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          CustomValidators.containsUpperCaseValidator(),
          CustomValidators.containsLowerCaseValidator(),
          CustomValidators.containsNumberValidator(),
          CustomValidators.containsSpecialCharacterValidator()
        ]
      ]
    },
    { validators: CustomValidators.passwordMatchValidator() }
  );

  getErrorMessage(controlName: string): string {
    return this.formErrorService.getErrorMessage(
      this.passwordChangeForm,
      controlName
    );
  }

  clearForm() {
    this.passwordChangeForm.reset();
  }

  onSubmit() {
    if (this.passwordChangeForm.valid) {
      this.blockUIService.start();
      this.authService.changePassword(this.passwordChangeForm.value).subscribe({
        next: (response: any) => {
          this.toastService.showSuccessToast(
            this.translateService.instant('success.changePassword')
          );
          this.blockUIService.stop();
          this.sessionService.logout();
        },
        error: (error: any) => {
          this.toastService.showErrorToast(error.error.description);
          this.blockUIService.stop();
        }
      });
    }
  }
}
