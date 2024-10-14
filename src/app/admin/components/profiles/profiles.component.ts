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
  pagedProfiles: any[] = [];
  rolesAvailable: any[] = [];
  filteredRolesAvailable: any[] = [];
  assignedRoles: any[] = [];
  filteredRolesAssigned: any[] = [];
  pageSize = 7;
  currentPage = 0;
  selectedProfile: any = { id: null, name: '', description: '', roles: [] };

  constructor(
    private profileService: ProfileService,
    private roleService: RoleService
  ) {}

  ngOnInit(): void {
    this.getProfiles();
    this.getRoles();
  }

  getProfiles(): void {
    this.profileService.getProfiles().subscribe(
      data => {
        this.profiles = data.content;
        this.filteredProfiles = this.profiles;
        this.updatePagedProfiles();
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

  asignarRol(role: any): void {
    this.assignedRoles.push(role);
    this.filteredRolesAssigned = this.assignedRoles;
    this.rolesAvailable = this.rolesAvailable.filter(
      r => r.idRole !== role.idRole
    ); // Filtrar por idRole
    this.filteredRolesAvailable = this.rolesAvailable;
  }

  quitarRol(role: any): void {
    this.rolesAvailable.push(role);
    this.filteredRolesAvailable = this.rolesAvailable;
    this.assignedRoles = this.assignedRoles.filter(r => r !== role);
    this.filteredRolesAssigned = this.assignedRoles;
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
          this.getProfiles();
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

  updatePagedProfiles(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedProfiles = this.filteredProfiles.slice(startIndex, endIndex);
  }

  handlePageEvent(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePagedProfiles();
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
    this.updatePagedProfiles();
  }

  selectProfile(profile: any): void {
    this.selectedProfile = { ...profile, roles: [...(profile.roles || [])] };
    this.assignedRoles = this.selectedProfile.roles || [];
    this.filteredRolesAssigned = this.assignedRoles;

    // Asegurarse de filtrar correctamente los roles disponibles
    this.filteredRolesAvailable = this.rolesAvailable.filter(
      role =>
        !this.assignedRoles.some(assigned => assigned.idRole === role.idRole)
    );
  }

  saveProfile() {
    const profileData = {
      name: this.selectedProfile.name,
      description: this.selectedProfile.description,
      idRoles: this.assignedRoles.map(role => role.idRole)
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
            this.getProfiles();
          },
          error: error => {
            console.error('Error al actualizar el perfil:', error);
          }
        });
    } else {
      this.profileService.createProfile(profileData).subscribe({
        next: response => {
          console.log('Perfil creado con éxito', response);
          this.getProfiles();
        },
        error: error => {
          console.error('Error al crear el perfil:', error);
        }
      });
    }
  }
}