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
    this.rolesAvailable = this.rolesAvailable.filter(r => r !== role);
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
    this.rolesAvailable = this.rolesAvailable.filter(
      role => !this.assignedRoles.some(assigned => assigned.id === role.id)
    );
    this.filteredRolesAvailable = this.rolesAvailable;
  }

  saveProfile(): void {
    if (this.selectedProfile.id) {
      this.profileService
        .updateProfile(this.selectedProfile.id, this.selectedProfile)
        .subscribe(
          response => {
            console.log('Perfil actualizado', response);
            this.getProfiles();
          },
          error => {
            console.error('Error al actualizar el perfil', error);
          }
        );
    } else {
      this.profileService.createProfile(this.selectedProfile).subscribe(
        response => {
          console.log('Perfil creado', response);
          this.getProfiles();
        },
        error => {
          console.error('Error al crear el perfil', error);
        }
      );
    }

    this.selectedProfile = { id: null, name: '', description: '' };
  }

  disableProfile(): void {
    if (this.selectedProfile?.idProfile) {
      const newStatus = !this.selectedProfile.status;
      console.log(
        `Actualizando perfil con ID: ${this.selectedProfile.idProfile}, nuevo estado: ${newStatus}`
      );

      this.profileService
        .toggleProfileStatus(this.selectedProfile.idProfile, newStatus)
        .subscribe(
          response => {
            console.log('Estado del perfil actualizado', response);
            this.selectedProfile.status = newStatus;
            this.getProfiles();
          },
          error => {
            console.error('Error al actualizar el estado del perfil', error);
          }
        );
    }
  }
}
