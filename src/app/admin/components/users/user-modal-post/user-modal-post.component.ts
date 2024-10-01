import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../users.component'; 

@Component({
  selector: 'app-user-modal-post',
  templateUrl: './user-modal-post.component.html',
  styleUrls: ['./user-modal-post.component.scss']
})
export class UserModalPostComponent {
  userForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UserModalPostComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private fb: FormBuilder
  ) {
    this.userForm = this.fb.group({
      id: [data.id],
      email: [data.email, [Validators.required, Validators.email]],
      name: [data.name, Validators.required],
      surname: [data.surname, Validators.required],
      username: [data.username, Validators.required],
      status: [data.status, Validators.required]
    });
  }

  onSave(): void {
    if (this.userForm.valid) {
      this.dialogRef.close(this.userForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
