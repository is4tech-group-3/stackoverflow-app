import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static passwordMatchValidator(): ValidatorFn {
    return (form: AbstractControl): ValidationErrors | null => {
      const newPassword = form.get('newPassword')?.value;
      const confirmPassword = form.get('confirmPassword')?.value;

      if (newPassword !== confirmPassword) {
        form.get('confirmPassword')?.setErrors({ mismatch: true });
        return { mismatch: true };
      } else {
        form.get('confirmPassword')?.setErrors(null);
        return null;
      }
    };
  }

  static containsSpecialCharacterValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(value);

      return hasSpecialCharacter ? null : { noSpecialCharacter: true };
    };
  }
 
  static containsNumberValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const hasNumber = /[0-9]/.test(value);

      return hasNumber ? null : { noNumber: true };
    };
  }

  static containsUpperCaseValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const hasUpperCase = /[A-Z]/.test(value);

      return hasUpperCase ? null : { noUppercase: true };
    };
  }

  static containsLowerCaseValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const hasLowerCase = /[a-z]/.test(value);

      return hasLowerCase ? null : { noLowercase: true };
    };
  }
}
