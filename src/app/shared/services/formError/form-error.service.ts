import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class FormErrorService {
  constructor(private readonly translate: TranslateService) {}

  getErrorMessage(form: FormGroup, controlName: string): string {
    const control = form.get(controlName);
    // console.log(controlName, control?.errors)
    const messages: { [key: string]: string } = {
      required: this.translate.instant('errors.required'),
      email: this.translate.instant('errors.invalidEmail'),
      minlength: this.translate.instant('errors.minLength', { minLength: control?.errors?.['minlength']?.requiredLength }),
      maxlength: this.translate.instant('errors.maxLength', { maxLength: control?.errors?.['maxlength']?.requiredLength }),
      pattern: this.translate.instant('errors.pattern'),
      mismatch: this.translate.instant('errors.mismatch'),
      noUppercase: this.translate.instant('errors.noUppercase'),
      noLowercase: this.translate.instant('errors.noLowercase'),
      noNumber: this.translate.instant('errors.noNumber'),
      noSpecialCharacter: this.translate.instant('errors.noSpecialCharacter'),
    };

    const errorKey = Object.keys(control?.errors || {}).find(key => {
      return control?.errors?.[key];
    });

    return errorKey ? messages[errorKey] || '' : '';
  }
}
