import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormErrorService } from 'src/app/shared/services/formError/form-error.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { UserService } from '../../service/user.service';
import { BlockUIService } from 'src/app/shared/services/blockUI/block-ui.service';
import { ProfileService } from '../../service/profile.service';
import { TranslateService } from '@ngx-translate/core';
import { AuditService } from '../../service/audit/audit.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  profiles: any[] = [];
  audits: any[] = [];

  isEditable = false;
  img = '';
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
    this.handlerGetAllAudit(0);
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
    this.isEditable = false;
    this.userForm.reset();
    this.userForm.get('email')?.enable();
    this.userForm.get('username')?.enable();
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.blockUIService.start();
      console.log(this.userForm.value);
      this.blockUIService.stop();
      if (this.userForm.get('id')?.value) {
        this.userService.updateUser(this.userForm.value).subscribe({
          next: () => {
            this.userForm.reset();
            this.blockUIService.stop();
            this.toastService.showSuccessToast(
              'Usuario actualizado correctamente'
            );
          },
          error: () => {
            this.blockUIService.stop();
            this.toastService.showErrorToast('Error al actualizar el usuario');
          }
        });
      } else {
        this.userService.createUser(this.userForm.value).subscribe({
          next: () => {
            this.userForm.reset();
            this.blockUIService.stop();
            this.toastService.showSuccessToast('Usuario creado correctamente');
          },
          error: () => {
            this.blockUIService.stop();
            this.toastService.showErrorToast('Error al crear el usuario');
          }
        });
      }
    }
  }

  setUser(id: number) {
    this.isEditable = true;
    this.userService.getUserById(id).subscribe({
      next: (response: any) => {
        this.userForm.patchValue(response);
        this.userForm.get('email')?.disable();
      },
      error: () => {
        this.toastService.showErrorToast('Error al obtener el usuario');
      }
    });
  }

  handlerDeleteUser(id: number) {
    this.blockUIService.start();
    this.userService.deleteUser(id).subscribe({
      next: () => {
        this.handlerGetAllUser();
        this.blockUIService.stop();
        this.toastService.showSuccessToast('Usuario eliminado correctamente');
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
    this.auditService.get().subscribe({
      next: (response: any) => {
        console.log(
          '🚀 ~ UsersComponent ~ this.auditService.getAuditByIdUser ~ response:',
          response
        );
        this.audits = response.audits;
        this.blockUIService.stop();
      },
      error: () => {
        this.blockUIService.stop();
        this.toastService.showErrorToast('Error al obtener los perfiles');
      }
    });
  }

  handlerGetAllUser() {
    this.blockUIService.start();
    this.userService.getAllUser().subscribe({
      next: (response: any) => {
        
        this.users = response.content;
        this.blockUIService.stop();
      },
      error: () => {
        this.blockUIService.stop();
        this.toastService.showErrorToast('Error al obtener los usuarios');
      }
    });
  }
}
