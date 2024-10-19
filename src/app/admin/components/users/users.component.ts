import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormErrorService } from 'src/app/shared/services/formError/form-error.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { UserService } from '../../service/user.service';
import { BlockUIService } from 'src/app/shared/services/blockUI/block-ui.service';
import { ProfileService } from '../../service/profile.service';
import { TranslateService } from '@ngx-translate/core';
import { AuditService } from '../../service/audit/audit.service';
import { convertFormGroupToFormData } from 'src/app/shared/utils/form-data.util';
import { Params } from '@angular/router';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  profiles: any[] = [];
  audits: any[] = [];
  pageSize = 8;
  totalLength = 0;
  selectedPhoto = '';
  isEditable = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly formErrorService: FormErrorService,
    private readonly toastService: ToastService,
    private readonly userService: UserService,
    private readonly blockUIService: BlockUIService,
    private readonly profileService: ProfileService,
    private readonly translate: TranslateService,
    private readonly auditService: AuditService
  ) {}

  ngOnInit(): void {
    this.handlerGetAllProfile();
    this.handlerGetAllUser();
    // this.handlerGetAllAudit();
  }

  userForm = this.formBuilder.group({
    id: [0],
    name: ['', [Validators.required]],
    surname: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    username: ['', [Validators.required]],
    idProfile: [''],
    image: [null]
  });

  getErrorMessage(controlName: string): string {
    return this.formErrorService.getErrorMessage(this.userForm, controlName);
  }

  clearForm() {
    this.selectedPhoto = '';
    this.isEditable = false;
    this.userForm.reset();
    this.userForm.get('email')?.enable();
    this.userForm.get('username')?.enable();
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.blockUIService.start();
      if (this.userForm.get('id')?.value) {
        this.userService.updateUser(this.userForm.value).subscribe({
          next: () => {
            this.userForm.reset();
            this.blockUIService.stop();
            this.toastService.showSuccessToast(
              this.translate.instant('success.userUpdated')
            );
          },
          error: () => {
            this.blockUIService.stop();
            this.toastService.showErrorToast('Error al actualizar el usuario');
          }
        });
      } else {
        const formData = convertFormGroupToFormData(this.userForm);
        this.userService.createUser(formData).subscribe({
          next: () => {
            this.clearForm();
            this.handlerGetAllUser();
            this.blockUIService.stop();
            this.toastService.showSuccessToast(
              this.translate.instant('success.userCreated')
            );
          },
          error: () => {
            this.blockUIService.stop();
            this.toastService.showErrorToast('Error al crear el usuario');
          }
        });
      }
    }
  }

  changePage(event: any) {
    this.handlerGetAllUser({
      size: this.pageSize,
      page: event.pageIndex
    });
  }

  setUser(id: number) {
    this.isEditable = true;
    this.userService.getUserById(id).subscribe({
      next: (response: any) => {
        const { image, ...rest } = response;
        this.userForm.patchValue(rest);
        this.selectedPhoto = image;
        this.userForm.get('email')?.disable();
      },
      error: () => {
        this.toastService.showErrorToast('Error al obtener el usuario');
      }
    });
  }

  handlerChangeStatus(id: number, status: boolean) {
    this.blockUIService.start();
    const successMessage = status
      ? 'success.userDisabled'
      : 'success.userEnabled';
    this.userService.changeStatus(id).subscribe({
      next: () => {
        this.handlerGetAllUser();
        this.blockUIService.stop();
        this.toastService.showSuccessToast(
          this.translate.instant(successMessage)
        );
      },
      error: () => {
        this.blockUIService.stop();
        this.toastService.showErrorToast('Error al eliminar el usuario');
      }
    });
  }

  handlerProfileChange(event: any) {
    this.blockUIService.start();
    const idProfile = parseInt(event.target.value);
    const id = this.userForm.get('id')?.value;
    if (id !== undefined && id !== null) {
      this.userService.changeProfile(id, idProfile).subscribe({
        next: () => {
          this.handlerGetAllUser();
          this.blockUIService.stop();
          this.toastService.showSuccessToast(
            this.translate.instant('success.changeProfile')
          );
        },
        error: () => {
          this.blockUIService.stop();
          this.toastService.showErrorToast('Error al actualizar el perfil');
        }
      });
    }
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
          next: () => {
            this.handlerGetAllUser();
            this.toastService.showSuccessToast(
              'Imagen actualizada correctamente'
            );
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

  handlerGetAllProfile() {
    this.blockUIService.start();
    this.profileService.getProfiles().subscribe({
      next: (response: any) => {
        this.profiles = response.content;
        this.blockUIService.stop();
      },
      error: () => {
        this.blockUIService.stop();
        this.toastService.showErrorToast('Error al obtener los perfiles');
      }
    });
  }

  handlerGetAllAudit(id: number) {
    this.blockUIService.start();
    this.auditService.get({ entity: 'USER' }).subscribe({
      next: (response: any) => {
        this.audits = response.audits;
        this.blockUIService.stop();
      },
      error: () => {
        this.blockUIService.stop();
        this.toastService.showErrorToast('Error al obtener los perfiles');
      }
    });
  }

  handlerGetAllUser(params?: Params) {
    this.blockUIService.start();
    this.userService.getAllUser(params).subscribe({
      next: (response: any) => {
        console.log(
          '🚀 ~ UsersComponent ~ this.userService.getAllUser ~ response:',
          response
        );
        this.users = response.content;
        this.totalLength = response.totalElements;
        this.blockUIService.stop();
      },
      error: () => {
        this.blockUIService.stop();
        this.toastService.showErrorToast('Error al obtener los usuarios');
      }
    });
  }
}
