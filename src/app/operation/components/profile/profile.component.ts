import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { UserService } from 'src/app/admin/service/user.service';
import { BlockUIService } from 'src/app/shared/services/blockUI/block-ui.service';
import { CookieUtil } from 'src/app/shared/utils/CookieUtil';
import { TranslateService } from '@ngx-translate/core';
import { FormErrorService } from 'src/app/shared/services/formError/form-error.service';
import { Router } from '@angular/router';
import { convertFormGroupToFormData } from 'src/app/shared/utils/form-data.util';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  selectedPhoto: string = '';
  userForm = this.formBuilder.group({
    id: [0],
    name: ['', [Validators.required]],
    surname: ['', [Validators.required]],
    email: [
      { value: '', disabled: true },
      [Validators.required, Validators.email]
    ],
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
    private readonly translateService: TranslateService,
    private readonly formErrorService: FormErrorService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    const currentUserId = CookieUtil.getValue('userId');
    console.log(typeof currentUserId);
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
          const { image, ...rest } = response;
          this.userForm.patchValue(rest);
          this.selectedPhoto = image;
          this.blockUIService.stop();

          this.formChanged = false;
        },
        error: () => {
          this.blockUIService.stop();
          this.toastService.showErrorToast(
            'Error al obtener el perfil del usuario'
          );
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
        this.userService.changeStatus(userId).subscribe({
          next: () => {
            this.blockUIService.stop();
            this.toastService.showSuccessToast(
              'Usuario deshabilitado correctamente'
            );
            this.logoutUser();
          },
          error: () => {
            this.blockUIService.stop();
            this.toastService.showErrorToast(
              'Error al deshabilitar el usuario'
            );
          }
        });
      } else {
        this.toastService.showErrorToast('ID de usuario no encontrado');
      }
    }
  }

  logoutUser() {
    CookieUtil.clear();
    this.router.navigate(['/auth/login']);
  }

  getErrorMessage(controlName: string): string {
    return this.formErrorService.getErrorMessage(this.userForm, controlName);
  }

  clearForm() {
    this.userForm.patchValue(this.originalFormValues);
    this.formChanged = false;
  }

  handlerChangeImage(event: any) {
    const file = event.target.files[0];
    if (file) {
      const id = this.userForm.get('id')?.value;
      const reader = new FileReader();

      reader.onload = () => {
        const imageData = reader.result;
        this.selectedPhoto = imageData as string;
      };
      this.userForm.patchValue({
        image: file
      });

      reader.readAsDataURL(file);
      if (id !== undefined && id !== null && id !== 0) {
        console.log('simon  si cambiaste la imagen');
        this.blockUIService.start();
        const formData = convertFormGroupToFormData(this.userForm);
        this.userService.changePhotoProfile(id, formData).subscribe({
          next: (response: any) => {
            this.toastService.showSuccessToast(
              'Imagen actualizada correctamente'
            );
            CookieUtil.setValue('imageUrl', response.image);
            this.blockUIService.stop();
          },
          error: () => {
            this.toastService.showErrorToast('Error al actualizar la imagen');
            this.blockUIService.stop();
          }
        });
      }
    }
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.blockUIService.start();
      console.log(this.userForm.value);
      this.userService.updateUser(this.userForm.value).subscribe({
        next: () => {
          this.toastService.showSuccessToast(
            'Perfil actualizado correctamente'
          );
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
