import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../../service/user.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements AfterViewInit {
  isSmallScreen: boolean = false;
  selectedUser: User | null = null;
  users: User[] = [];
  allUsers: User[] = [];
  paginatedUsers: User[] = []; 
  filteredUsers: User[] = [];
  dataSource = new MatTableDataSource<User>([]);

  pageSize = 8;
  currentPage = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  newUser: User = {
    id: 0,
    name: '',
    surname: '',
    username: '',
    email: '',
    status: true, 
    isDisabled: false,
    isExpanded: false 
  };

  private userBackup: User | null = null;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private userService: UserService,
    private toastService: ToastService,
    private translate: TranslateService
  ) {
    this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small])
      .subscribe(result => {
        this.isSmallScreen = result.matches;
      });

    this.getUsers();
  }

  getUsers(page: number = this.currentPage, size: number = this.pageSize): void {
    this.userService.getUsersPaginated(page, size).subscribe({
      next: (response) => {
        console.log('Usuarios recibidos:', response);
        this.users = response.content.map((user: User) => ({ 
          ...user, 
          isExpanded: false,
          isDisabled: user.status === false 
        }));
        this.dataSource.data = this.users;
        this.allUsers = response.content; 
        this.paginator.length = response.totalElements;
        this.paginator.pageIndex = response.number;
        this.paginator.pageSize = response.size;

        this.updatePaginatedUsers(); 
      },
      error: (error) => {
        console.error('Error al obtener los usuarios', error);
        this.toastService.showErrorToast(this.translate.instant('errors.fetchUsers'));
      }
    });
  }

  updatePaginatedUsers(): void {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedUsers = this.filteredUsers.length
      ? this.filteredUsers.slice(start, end) 
      : this.allUsers.slice(start, end); 
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedUsers(); 
    this.getUsers(this.currentPage, this.pageSize); 
  }

  filterUsers(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    
    this.filteredUsers = this.allUsers.filter(user => {
      const nameMatch = `${user.name} ${user.surname}`.toLowerCase().includes(filterValue);
      const emailMatch = user.email.toLowerCase().includes(filterValue);
      return nameMatch || emailMatch;
    });

    this.currentPage = 0;  
    this.paginator.firstPage();
    this.paginator.length = this.filteredUsers.length; 

    this.updatePaginatedUsers(); 
  }

  editUser(user: User): void {
    this.userBackup = { ...user }; 
    user.isEditing = true;
  }

  cancelEdit(user: User): void {
    if (this.userBackup) {
      user.name = this.userBackup.name;
      user.surname = this.userBackup.surname;
      user.username = this.userBackup.username;
    }
    user.isEditing = false; 
    this.userBackup = null; 
  }

  saveUser(user: User): void {
    if (!user.name || !user.surname || !user.username) {
      this.toastService.showErrorToast(this.translate.instant('errors.requiredFields'));
      return;
    }

    const userUpdatePayload = {
      name: user.name,
      surname: user.surname,
      username: user.username
    };

    this.userService.updateUser(user.id, userUpdatePayload).subscribe({
      next: (updatedUser: User) => {
        console.log('Usuario actualizado:', updatedUser);
        user.isEditing = false;
        this.toastService.showSuccessToast(this.translate.instant('success.userUpdated'));
      },
      error: (error) => {
        console.error('Error al actualizar el usuario:', error);
        this.toastService.showErrorToast(this.translate.instant('errors.updateUser'));
      }
    });
  }

  enableUser(user: User): void {
    if (!user.id) {
        console.error('El usuario no tiene un ID válido:', user);
        return;
    }
  
    const confirmation = confirm(this.translate.instant('confirm.enableUser', { name: user.name, surname: user.surname }));
  
    if (confirmation) {
        const newStatus = true; 
  
        this.userService.toggleUserStatus(user.id, newStatus).subscribe({
            next: () => {
                console.log('Usuario habilitado');
                this.getUsers(this.currentPage, this.pageSize);
                this.toastService.showSuccessToast(this.translate.instant('success.userEnabled'));
            },
            error: (error) => {
                console.error('Error al habilitar el usuario:', error);
                this.toastService.showErrorToast(this.translate.instant('errors.enableUser'));
            }
        });
    }
  }


disableUser(user: User): void {
  if (!user.id) {
      console.error('El usuario no tiene un ID válido:', user);
      return;
  }

  const confirmation = confirm(this.translate.instant('confirm.disableUser', { name: user.name, surname: user.surname }));

  if (confirmation) {
      const newStatus = false; 
      this.userService.toggleUserStatus(user.id, newStatus).subscribe({
          next: () => {
              console.log('Usuario deshabilitado');
              this.getUsers(this.currentPage, this.pageSize);
              this.toastService.showSuccessToast(this.translate.instant('success.userDisabled'));
          },
          error: (error) => {
              console.error('Error al deshabilitar el usuario:', error);
              this.toastService.showErrorToast(this.translate.instant('errors.disableUser'));
          }
      });
  }
}


  addUser(): void {
    const userToCreate = { ...this.newUser, status: true };
  
    this.userService.createUser(userToCreate).subscribe({
      next: (createdUser: User) => {
        console.log('Usuario creado:', createdUser);
        this.getUsers();
        this.newUser = { id: 0, name: '', surname: '', email: '', username: '', status: true, isDisabled: false, isExpanded: false }; // Cambiado de '' a true
        this.toastService.showSuccessToast(this.translate.instant('success.userCreated'));
      },
      error: (error) => {
        console.error('Error al crear el usuario:', error);
        this.toastService.showErrorToast(this.translate.instant('errors.createUser'));
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.getUsers();
  }
}

export interface User {
  id: number;
  name: string;
  surname: string;
  username: string;
  email: string;
  status: boolean; 
  isDisabled: boolean;
  isEditing?: boolean;
  isExpanded?: boolean;
}
