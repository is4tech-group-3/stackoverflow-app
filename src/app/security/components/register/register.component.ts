import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { BlockUIService } from 'src/app/shared/services/blockUI/block-ui.service';
import { convertFormGroupToFormData } from 'src/app/shared/utils/form-data.util';
import { FormErrorService } from 'src/app/shared/services/formError/form-error.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  selectedPhoto = '';

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly translate: TranslateService,
    private readonly router: Router,
    private readonly toastService: ToastService,
    private readonly blockUIService: BlockUIService,
    private readonly formErrorService: FormErrorService
  ) {}

  registerForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(50)]],
    surname: ['', [Validators.required, Validators.maxLength(50)]],
    email: [
      '',
      [Validators.required, Validators.email, Validators.maxLength(50)]
    ],
    username: ['', [Validators.required, Validators.maxLength(50)]],
    image: [null]
  });

  fileName = '';

  handleFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageData = reader.result;
        this.selectedPhoto = imageData as string;
      };
      this.registerForm.patchValue({
        image: file
      });

      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.blockUIService.start();
      const formData = convertFormGroupToFormData(this.registerForm);
      this.authService.signup(formData).subscribe({
        next: (response: any) => {
          this.registerForm.reset();
          this.blockUIService.stop();
          this.toastService.showSuccessToast(
            this.translate.instant('success.Registered')
          );
          this.router.navigate(['/auth/login']);
        },
        error: error => {
          console.log(
            '🚀 ~ RegisterComponent ~ this.authService.signup ~ error:',
            error
          );
          this.toastService.showErrorToast(error.error.detail);
          this.blockUIService.stop();
        }
      });
    }
  }

  getErrorMessage(controlName: string) {
    return this.formErrorService.getErrorMessage(
      this.registerForm,
      controlName
    );
  }
}
