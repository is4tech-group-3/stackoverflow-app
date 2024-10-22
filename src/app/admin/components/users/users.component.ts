import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
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
import { PageEvent } from '@angular/material/paginator';
import { ModalService } from 'src/app/shared/components/modal/service/modal.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  @ViewChild('modalContent') modalContent!: TemplateRef<any>;
  users: any[] = [];
  profiles: any[] = [];
  audits: any[] = [];
  pageSize = 8;
  pageSizeAudit = 8;
  totalLength = 0;
  totalAudit = 0;
  currentPage = 1;
  selectedAudit: any = null;

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
    private readonly auditService: AuditService,
    private readonly modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.handlerGetAllProfile();
    this.handlerGetAllUser();
    this.handlerGetAllAudit();
  }

  userForm = this.formBuilder.group({
    id: [0],
    name: ['', [Validators.required, Validators.maxLength(50)]],
    surname: ['', [Validators.required, Validators.maxLength(50)]],
    email: [
      '',
      [Validators.required, Validators.email, Validators.maxLength(50)]
    ],
    username: ['', [Validators.required, Validators.maxLength(50)]],
    idProfile: ['', Validators.maxLength(50)],
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

  getHttpMethodClass(httpMethod: string): string {
    switch (httpMethod) {
      case 'GET':
        return 'text-emerald-500';
      case 'POST':
        return 'text-amber-500';
      case 'PUT':
        return 'text-blue-500';
      case 'DELETE':
        return 'text-rose-500';
      case 'PATCH':
        return 'text-purple-500';
      default:
        return 'text-gray-500';
    }
  }

  getStatusHttpMethod(statusHttp: number): string {
    if (statusHttp >= 200 && statusHttp < 300) {
      return 'text-emerald-500';
    } else if (statusHttp >= 300 && statusHttp < 400) {
      return 'text-purple-500';
    } else if (statusHttp >= 400 && statusHttp < 500) {
      return 'text-amber-500';
    } else if (statusHttp >= 500 && statusHttp < 600) {
      return 'text-rose-500';
    } else {
      return 'text-gray-500';
    }
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
  openModal(audit: any) {
    this.selectedAudit = audit;
    this.modalService.open(
      this.translate.instant('audit.data.details'),
      this.modalContent
    );
  }
  handlePageEvent(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex + 1;

    this.handlerGetAllAudit({
      limit: this.pageSize.toString(),
      page: this.currentPage.toString()
    });
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

  handlerGetAllAudit(params?: Params) {
    this.blockUIService.start();
    this.auditService.get({ ...params, entity: 'USER', limit: '8' }).subscribe({
      next: (response: any) => {
        this.totalAudit = response.pagination.totalAudits;
        this.currentPage = response.pagination.currentPage;
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
