import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent {
  emailForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.emailForm = this.fb.group({
      email: [' ', [Validators.required, Validators.email]]
    });
  }

  onBack() {
    this.router.navigate(['/auth/login']);
  }

  onSubmit() {
    if (this.emailForm.valid) {
      const email = this.emailForm.get('email')?.value;
      this.router.navigate(['/auth/forgot-password/password-change', { email }]);
    } else {
      // Trigger validation messages if the form is invalid
      this.emailForm.markAllAsTouched();
    }
  }
}
