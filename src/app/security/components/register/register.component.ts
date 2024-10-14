import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { BlockUIService } from 'src/app/shared/services/blockUI/block-ui.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private translate: TranslateService,
    private router: Router,
    private toastService: ToastService,
    private blockUIService: BlockUIService
  ) {}

  registerForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    surname: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    username: ['', [Validators.required]]
  });

  onSubmit() {
    if (this.registerForm.valid) {
      this.blockUIService.start();
      this.authService.signup(this.registerForm.value).subscribe({
        next: (response: any) => {
          this.registerForm.reset();          
          this.blockUIService.stop();
          this.toastService.showSuccessToast(
            this.translate.instant('success.Registered')
          );
          this.router.navigate(['/auth/login']);
        },
        error: error => {
          const errorMessage = this.getBackendErrorMessage(error.error);
          this.toastService.showErrorToast(errorMessage);
          this.blockUIService.stop();
        }
      });
    }
  }

  getBackendErrorMessage(error: any): string {
    console.error(error?.detail);

    if (error?.detail) {
      if (error.detail.includes('Email is already in use')) {
        return this.translate.instant('errors.emailInUse');
      }
    }
    return this.translate.instant('errors.internalServerError');
  }

  getErrorMessage(controlName: string) {
    const control = this.registerForm.get(controlName);
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
