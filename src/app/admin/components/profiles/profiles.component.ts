import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../service/profile.service';
import { RoleService } from '../../service/role.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent implements OnInit {
  profiles: any[] = [];
  filteredProfiles: any[] = [];
  rolesAvailable: any[] = [];
  filteredRolesAvailable: any[] = [];
  assignedRoles: any[] = [];
  filteredRolesAssigned: any[] = [];
  currentPage = 0;
  totalItems = 0;
  selectedProfile: any = { id: null, name: '', description: '', roles: [] };
  hasChanges: boolean = false;

  constructor(
    private profileService: ProfileService,
    private roleService: RoleService
  ) {}

  ngOnInit(): void {
    this.getProfiles(this.currentPage);
    this.getRoles();
  }

  getProfiles(page: number): void {
    this.profileService.getProfiles(page).subscribe(
      data => {
        this.profiles = data.content;
        this.filteredProfiles = this.profiles;
        this.totalItems = data.totalElements;
      },
      error => {
        console.error('Error al obtener perfiles', error);
      }
    );
  }

  getRoles(): void {
    this.roleService.getRoles().subscribe(
      data => {
        this.rolesAvailable = data;
        this.filteredRolesAvailable = this.rolesAvailable;
      },
      error => {
        console.error('Error al obtener roles', error);
      }
    );
  }

  onFieldChange() {
    this.hasChanges = true;
  }

  asignarRol(role: any): void {
    this.assignedRoles.push(role);
    this.filteredRolesAssigned = this.assignedRoles;
    this.rolesAvailable = this.rolesAvailable.filter(
      r => r.idRole !== role.idRole
    );
    this.filteredRolesAvailable = this.rolesAvailable.filter(
      role =>
        !this.assignedRoles.some(assigned => assigned.idRole === role.idRole)
    );

    this.hasChanges = true;
  }

  quitarRol(role: any): void {
    this.assignedRoles = this.assignedRoles.filter(
      r => r.idRole !== role.idRole
    );
    this.filteredRolesAssigned = this.assignedRoles;

    if (!this.rolesAvailable.some(r => r.idRole === role.idRole)) {
      this.rolesAvailable.push(role);
    }
    this.filteredRolesAvailable = this.rolesAvailable.filter(
      role =>
        !this.assignedRoles.some(assigned => assigned.idRole === role.idRole)
    );

    this.hasChanges = true;
  }

  filterRolesDisponibles(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const filterValue = inputElement.value.trim().toLowerCase();
    this.filteredRolesAvailable = this.rolesAvailable.filter(role =>
      role.name.toLowerCase().includes(filterValue)
    );
  }

  toggleStatus(): void {
    if (!this.selectedProfile) return;
    const newStatus = !this.selectedProfile.status;
    const partialProfile = {
      status: newStatus
    };
    this.profileService
      .patchProfile(this.selectedProfile.idProfile, partialProfile)
      .subscribe({
        next: response => {
          this.selectedProfile.status = newStatus;
          this.getProfiles(this.currentPage);
          console.log(
            `Perfil ${newStatus ? 'habilitado' : 'deshabilitado'} con éxito`,
            response
          );
        },
        error: error => {
          console.error(
            'Error al actualizar el estado del perfil:',
            error.error.detail,
            error.error.instance
          );
        }
      });
  }

  filterRolesAsignados(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const filterValue = inputElement.value.trim().toLowerCase();
    this.filteredRolesAssigned = this.assignedRoles.filter(role =>
      role.name.toLowerCase().includes(filterValue)
    );
  }

  moverTodosAAsignados(): void {
    this.assignedRoles = [...this.assignedRoles, ...this.rolesAvailable];
    this.filteredRolesAssigned = this.assignedRoles;
    this.rolesAvailable = [];
    this.filteredRolesAvailable = [];
  }

  moverTodosADisponibles(): void {
    this.rolesAvailable = [...this.rolesAvailable, ...this.assignedRoles];
    this.filteredRolesAvailable = this.rolesAvailable;
    this.assignedRoles = [];
    this.filteredRolesAssigned = [];
  }

  handlePageEvent(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.getProfiles(this.currentPage);
  }

  filterProfiles(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const filterValue = inputElement.value
      ? inputElement.value.trim().toLowerCase()
      : '';
    this.filteredProfiles = this.profiles.filter(
      profile =>
        profile.name.toLowerCase().includes(filterValue) ||
        profile.description.toLowerCase().includes(filterValue)
    );
  }

  selectProfile(profile: any): void {
    this.selectedProfile = { ...profile, roles: [...(profile.roles || [])] };
    this.assignedRoles = this.selectedProfile.roles || [];
    this.filteredRolesAssigned = this.assignedRoles;
    this.hasChanges = false;
    this.filteredRolesAvailable = this.rolesAvailable.filter(
      role =>
        !this.assignedRoles.some(assigned => assigned.idRole === role.idRole)
    );
  }

  saveProfile() {
    const profileData = {
      name: this.selectedProfile.name,
      description: this.selectedProfile.description,
      idRoles: this.assignedRoles.map((r: any) => r.idRole)
    };

    if (!profileData.idRoles || profileData.idRoles.length === 0) {
      console.error('No IDs assigned to the roles.');
      return;
    }

    if (this.selectedProfile.idProfile) {
      this.profileService
        .updateProfile(this.selectedProfile.idProfile, profileData)
        .subscribe({
          next: response => {
            console.log('Perfil actualizado con éxito', response);
            this.getProfiles(this.currentPage);
          },
          error: error => {
            console.error('Error al actualizar el perfil:', error);
          }
        });
    } else {
      this.profileService.createProfile(profileData).subscribe({
        next: response => {
          console.log('Perfil creado con éxito', response);
          this.getProfiles(this.currentPage);
        },
        error: error => {
          console.error('Error al crear el perfil:', error);
        }
      });
    }
  }

  checkIfCanSave(): boolean {
    const { name, description, roles } = this.selectedProfile;
    if (!this.selectedProfile.idProfile) {
      return (
        !!name?.trim() && !!description?.trim() && this.assignedRoles.length > 0
      );
    }

    const originalProfile = this.profiles.find(
      p => p.idProfile === this.selectedProfile.idProfile
    );

    if (!originalProfile) return false;
    const nameChanged = originalProfile.name !== this.selectedProfile.name;
    const descriptionChanged =
      originalProfile.description !== this.selectedProfile.description;
    const rolesChanged =
      originalProfile.roles
        ?.map((r: any) => r.idRole)
        .sort()
        .join(',') !==
      this.assignedRoles
        .map((r: any) => r.idRole)
        .sort()
        .join(',');
    this.hasChanges = nameChanged || descriptionChanged || rolesChanged;
    return this.hasChanges;
  }
}