import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { UserService } from 'src/app/admin/service/user.service';
import { BlockUIService } from 'src/app/shared/services/blockUI/block-ui.service';
import { CookieUtil } from 'src/app/shared/utils/CookieUtil'; 
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userForm = this.formBuilder.group({
    id: [0],
    name: ['', [Validators.required]],
    surname: ['', [Validators.required]],
    email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
    username: ['', [Validators.required]],
    image: [null]
  });

  originalFormValues: any;
  formChanged: boolean = false; 

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly toastService: ToastService,
    private readonly userService: UserService,
    private readonly blockUIService: BlockUIService,
    private readonly translateService: TranslateService 
  ) {}

  ngOnInit(): void {
    const currentUserId = CookieUtil.getValue('userId'); 
    this.loadUserProfile(currentUserId);
    
    this.userForm.valueChanges.subscribe(() => {
      this.formChanged = true; 
    });
  }

  loadUserProfile(userId: string | null) {
    if (userId) { 
      this.blockUIService.start();
      this.userService.getUserById(Number(userId)).subscribe({
        next: (response: any) => {
          this.originalFormValues = response; 
          this.userForm.patchValue(response);
          this.blockUIService.stop();
        },
        error: () => {
          this.blockUIService.stop();
          this.toastService.showErrorToast('Error al obtener el perfil del usuario');
        }
      });
    } else {
      this.toastService.showErrorToast('ID de usuario no encontrado');
    }
  }

  disableUser() {
    const message = this.translateService.instant('warning.disableUser');
    const confirmed = window.confirm(message);
  
    if (confirmed) {
      const userId = this.userForm.get('id')?.value;
      if (userId) {
        this.blockUIService.start();
        this.userService.deleteUser(userId).subscribe({
          next: () => {
            this.blockUIService.stop();
            this.toastService.showSuccessToast('Usuario deshabilitado correctamente');
            this.logoutUser(); 
          },
          error: () => {
            this.blockUIService.stop();
            this.toastService.showErrorToast('Error al deshabilitar el usuario');
          }
        });
      } else {
        this.toastService.showErrorToast('ID de usuario no encontrado');
      }
    }
  }

  logoutUser() {
    CookieUtil.clear();  
    window.location.href = '/login';  
  }

  getErrorMessage(controlName: string): string {
    const control = this.userForm.get(controlName);
    if (control?.hasError('required')) {
      return `${controlName.charAt(0).toUpperCase() + controlName.slice(1)} es obligatorio.`;
    }
    if (control?.hasError('email')) {
      return 'El correo electrónico no es válido.';
    }
    return '';
  }

  clearForm() {
    this.userForm.patchValue(this.originalFormValues); 
    this.formChanged = false; 
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.blockUIService.start();
      console.log(this.userForm.value);
      this.userService.updateUser(this.userForm.value).subscribe({
        next: () => {
          this.toastService.showSuccessToast('Perfil actualizado correctamente');
          this.blockUIService.stop();
          this.originalFormValues = this.userForm.value; 
          this.formChanged = false; 
        },
        error: () => {
          this.blockUIService.stop();
          this.toastService.showErrorToast('Error al actualizar el perfil');
        }
      });
    }
  }
}
