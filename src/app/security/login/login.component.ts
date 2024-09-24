import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  hide = true;

  errorMessages = {
    required: 'This field is required.',
    invalidEmail: 'Please enter a valid email address.',
    minLength: 'Password must be at least 8 characters long.',
    pattern: 'Please enter only numbers',
  };

  loginForm = this.validatorForm.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });



  constructor(private validatorForm: FormBuilder) { }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Formulario enviado', this.loginForm.value);
    } else {
      console.log('Formulario no válido');
    }
  }



  getErrorMessage(controlName: string) {
    const control = this.loginForm.get(controlName);
    const messages: { [key: string]: string } = {
      required: this.errorMessages.required,
      email: this.errorMessages.invalidEmail,
      minlength: this.errorMessages.minLength
    };
    if (control && control.errors) {
      const errorKey = Object.keys(control.errors).find(key => control.errors![key]);
      if (errorKey) {
        return messages[errorKey] || '';
      }
    }
    return '';
  }

}
