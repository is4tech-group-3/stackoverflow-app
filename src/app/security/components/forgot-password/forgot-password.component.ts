import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper, StepperOrientation } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { AuthService } from '../../service/auth/auth.service';
import { FormErrorService } from 'src/app/shared/services/formError/form-error.service';
import { BlockUIService } from 'src/app/shared/services/blockUI/block-ui.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  constructor(
    private authService: AuthService,
    private validatorForm: FormBuilder,
    private router: Router,
    private translate: TranslateService,
    private toastService: ToastService,
    private formErrorService: FormErrorService,
    private blockUIService: BlockUIService,
    breakpointObserver: BreakpointObserver
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 1280px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  @ViewChild('stepper') stepper!: MatStepper;

  hide: boolean = true;
  hideConfirm: boolean = true;
  isEditable: boolean = true;
  stepperOrientation: Observable<StepperOrientation>;

  emailForm = this.validatorForm.group({
    email: ['', [Validators.required, Validators.email]]
  });

  passwordChangeForm = this.validatorForm.group(
    {
      email: [
        { value: '', disabled: true },
        [Validators.required, Validators.email]
      ],
      code: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    },
    { validator: this.passwordMatchValidator }
  );

  passwordMatchValidator(form: FormGroup) {
    return form.get('newPassword')?.value === form.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  onSubmit() {
    if (this.emailForm.valid) {
      this.blockUIService.start();
      this.authService.recoveryPassword(this.emailForm.value).subscribe({
        next: (response: any) => {
          this.toastService.showSuccessToast(
            this.translate.instant('success.PasswordRecovery')
          );
          const email = this.emailForm.get('email')?.value;
          this.passwordChangeForm.patchValue({ email: email });
          this.blockUIService.stop();
          this.nextStep();
        },
        error: error => {
          this.blockUIService.stop();
          this.toastService.showErrorToast(
            this.translate.instant('errors.sendEmailError')
          );
        }
      });
    }
  }

  resetPasswordOnSubmit() {
    if (this.passwordChangeForm.valid) {
      this.blockUIService.start();
      const formValue = { ...this.passwordChangeForm.getRawValue() };
      this.authService.resetPassword(formValue).subscribe({
        next: (response: any) => {
          this.toastService.showSuccessToast(
            this.translate.instant('success.PasswordReset')
          );
          this.blockUIService.stop();
          this.nextStep();
        },
        error: error => {
          this.blockUIService.stop();
          this.toastService.showErrorToast(
            this.translate.instant('errors.errorChangePassword')
          );
        }
      });
    }
  }

  nextStep() {
    this.stepper.next();
  }

  previousStep() {
    this.stepper.previous();
  }

  getErrorMessage(controlName: string) {
    return (
      this.formErrorService.getErrorMessage(this.emailForm, controlName) ||
      this.formErrorService.getErrorMessage(
        this.passwordChangeForm,
        controlName
      )
    );
  }
}
