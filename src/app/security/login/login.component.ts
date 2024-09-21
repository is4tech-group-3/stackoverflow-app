import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  hide = true;
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // Inicializar el formulario con validaciones
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  // Método para manejar el envío del formulario
  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Formulario enviado', this.loginForm.value);
    } else {
      console.log('Formulario no válido');
    }
  }

  // Métodos para obtener los errores de validación
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
