import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss']
})
export class PasswordChangeComponent implements OnInit {
  passwordChangeForm: FormGroup;
  email: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.passwordChangeForm = this.fb.group({
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      verificationCode: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit() {
    this.email = this.route.snapshot.paramMap.get('email') || '';
    this.passwordChangeForm.patchValue({ email: this.email });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('newPassword')?.value === form.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.passwordChangeForm.valid) {
      console.log('Form submitted:', this.passwordChangeForm.value);
      this.router.navigate(['/auth/reset-password']);
    }
  }

  onBack() {
    this.router.navigate(['/auth/forgot-password/email']);
  }
}
