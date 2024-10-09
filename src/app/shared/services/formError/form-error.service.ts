import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class FormErrorService {
  constructor(private translate: TranslateService) {}

  getErrorMessage(form: FormGroup, controlName: string): string {
    const control = form.get(controlName);
    const messages: { [key: string]: string } = {
      required: this.translate.instant('errors.required'),
      email: this.translate.instant('errors.invalidEmail'),
      minlength: this.translate.instant('errors.minLength'),
      pattern: this.translate.instant('errors.pattern'),
      mismatch: this.translate.instant('errors.mismatch')
    };
    console.log(
      '🚀 ~ FormErrorService ~ getErrorMessage ~ control.errors:',
      control?.errors,
      controlName
    );
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
