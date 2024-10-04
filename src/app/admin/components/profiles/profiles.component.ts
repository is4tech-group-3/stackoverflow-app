import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../service/profile.service';
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
  pageSize = 8;
  currentPage = 0;
  selectedProfile: any = { id: null, name: '', description: '' };

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.getProfiles();
  }

  getProfiles(): void {
    this.profileService.getProfiles().subscribe(
      data => {
        this.profiles = data;
        this.filteredProfiles = data;
        this.updatePagedProfiles();
      },
      error => {
        console.error('Error al obtener perfiles', error);
      }
    );
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
    this.selectedProfile = { ...profile };
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
