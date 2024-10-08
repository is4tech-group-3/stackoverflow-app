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

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  @ViewChild('stepper') stepper!: MatStepper;

  hide: boolean = true;
  hideConfirm: boolean = true;
  isEditable: boolean = true;
  stepperOrientation: Observable<StepperOrientation>;

  constructor(
    private authService: AuthService,
    private validatorForm: FormBuilder,
    private router: Router,
    private translate: TranslateService,
    private toastService: ToastService,
    breakpointObserver: BreakpointObserver
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  errorMessages = {
    required: 'This field is required.',
    invalidEmail: 'Please enter a valid email address.',
    minLength: 'Password must be at least 8 characters long.',
    pattern: 'Please enter only numbers',
    mismatch: 'Passwords do not match.'
  };

  emailForm = this.validatorForm.group({
    email: ['', [Validators.required, Validators.email]]
  });

  passwordChangeForm = this.validatorForm.group(
    {
      email: [
        { value: '', disabled: true },
        [Validators.required, Validators.email]
      ],
      verificationCode: [
        '',
        [Validators.required, Validators.pattern('^[0-9]+$')]
      ],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    },
    { validator: this.passwordMatchValidator }
  );

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  onBack = () => this.router.navigate(['/auth/login']);

  onSubmit() {
    if (this.emailForm.valid) {
      const email = this.emailForm.get('email')?.value;
      this.passwordChangeForm.patchValue({ email: email });

      this.authService.recoveryPassword(this.emailForm.value).subscribe({
        next: (response: any) => {
          this.toastService.showSuccessToast(
            this.translate.instant('success.PasswordRecovery')
          );
          this.nextStep();
        },
        error: error => {
          this.nextStep();
          console.error('Error al enviar el email:', error);
          this.toastService.showErrorToast('Eror al enviar el email');
        }
      });
    }
  }

  resetPasswordOnSubmit() {
    this.passwordChangeForm.reset();
    if (this.passwordChangeForm.valid) {
      this.authService.resetPassword(this.passwordChangeForm.value).subscribe({
        next: (response: any) => {
          this.toastService.showSuccessToast(
            this.translate.instant('success.PasswordReset')
          );
          this.nextStep();
        },
        error: error => {
          this.nextStep();
          console.error('Error al enviar el email:', error);
          this.toastService.showErrorToast('Eror al enviar el email');
        }
      });
    }
  }

  onVerificationCodeChange(code: string) {
    if (code && code.length === 6) {
      // Ejemplo: asume que el código es de 6 
      this.authService.verifyCode(code).subscribe({
        next: (response: any) => {
          if (response.isValid) {
            this.toastService.showSuccessToast(
              this.translate.instant('success.ValidCode')
            );
            // Hacer algo adicional si es necesario
          } else {
            this.toastService.showErrorToast(
              this.translate.instant('error.InvalidCode')
            );
          }
        },
        error: error => {
          console.error('Error validando el código de verificación:', error);
          this.toastService.showErrorToast(
            this.translate.instant('error.ValidationError')
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
    const control =
      this.emailForm.get(controlName) ||
      this.passwordChangeForm.get(controlName);
    const messages: { [key: string]: string } = {
      required: this.errorMessages.required,
      email: this.errorMessages.invalidEmail,
      minlength: this.errorMessages.minLength,
      pattern: this.errorMessages.pattern,
      mismatch: this.errorMessages.mismatch
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
