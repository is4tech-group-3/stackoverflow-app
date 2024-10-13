import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../../service/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    status: '',
    isExpanded: false 
  };

  private userBackup: User | null = null;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {
    this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small])
      .subscribe(result => {
        this.isSmallScreen = result.matches;
      });

    this.getUsers();
  }

  getUsers(page: number = this.currentPage, size: number = this.pageSize): void {
    this.userService.getUsersPaginated(page, size).subscribe(
      response => {
        console.log('Usuarios recibidos:', response);
        this.users = response.content.map((user: User) => ({ ...user, isExpanded: false }));
        this.dataSource.data = this.users;
        this.allUsers = response.content; 
        this.paginator.length = response.totalElements;
        this.paginator.pageIndex = response.number;
        this.paginator.pageSize = response.size;

        this.updatePaginatedUsers(); // Actualiza paginatedUsers al obtener usuarios
      },
      error => {
        console.error('Error al obtener los usuarios', error);
        this.snackBar.open('Error al obtener los usuarios', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      }
    );
  }

  updatePaginatedUsers(): void {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedUsers = this.allUsers.slice(start, end); // Actualiza paginatedUsers
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedUsers(); // Actualiza la paginación
    this.getUsers(this.currentPage, this.pageSize); // Llama a getUsers si es necesario
  }

  filterUsers(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    
    const filteredUsers = this.allUsers.filter(user => {
      const nameMatch = `${user.name} ${user.surname}`.toLowerCase().includes(filterValue);
      const emailMatch = user.email.toLowerCase().includes(filterValue);
      return nameMatch || emailMatch;
    });
    
    this.dataSource.data = filteredUsers;
    this.filteredUsers = filteredUsers; // Actualiza filteredUsers

    // Actualizar la longitud del paginator
    this.paginator.length = filteredUsers.length; 

    if (!filterValue) {
      this.dataSource.data = this.allUsers;
      this.filteredUsers = this.allUsers; // Si no hay filtro, restaurar a todos los usuarios
      this.paginator.length = this.allUsers.length; 
    }

    this.updatePaginatedUsers(); // Actualiza paginatedUsers al filtrar
  }

  editUser(user: User): void {
    this.userBackup = { ...user }; // Guarda una copia del usuario actual
    user.isEditing = true;
  }

  cancelEdit(user: User): void {
    if (this.userBackup) {
      // Restaura los valores del usuario a los de la copia
      user.name = this.userBackup.name;
      user.surname = this.userBackup.surname;
      user.username = this.userBackup.username;
    }
    user.isEditing = false; // Salir del modo de edición
    this.userBackup = null; 
  }

  saveUser(user: User): void {
    if (!user.name || !user.surname || !user.username) {
      this.snackBar.open('Todos los campos son obligatorios', 'Cerrar', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
      return;
    }

    const userUpdatePayload = {
      name: user.name,
      surname: user.surname,
      username: user.username
    };

    this.userService.updateUser(user.id, userUpdatePayload).subscribe(
      (updatedUser: User) => {
        console.log('Usuario actualizado:', updatedUser);
        user.isEditing = false;
        this.snackBar.open('Usuario actualizado exitosamente', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      },
      error => {
        console.error('Error al actualizar el usuario:', error);
        this.snackBar.open('Error al actualizar el usuario', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      }
    );
  }

  disableUser(user: User): void {
    if (!user.id) {
      console.error('El usuario no tiene un ID válido:', user);
      return;
    }
  
    const confirmation = confirm(`¿Estás seguro de que deseas deshabilitar al usuario ${user.name} ${user.surname}?`);
  
    if (confirmation) {
      // Cambiar el estado del usuario a "false"
      this.userService.toggleUserStatus(user.id, false).subscribe(
        () => {
          console.log('Usuario deshabilitado');
          this.getUsers(this.currentPage, this.pageSize); // Refresca la lista de usuarios después de deshabilitar
          this.snackBar.open('Usuario deshabilitado exitosamente', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
        },
        error => {
          console.error('Error al deshabilitar el usuario:', error);
          this.snackBar.open('Error al deshabilitar el usuario', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
        }
      );
    }
  }

  addUser(): void {
    const userToCreate = { ...this.newUser, status: 'true' };

    this.userService.createUser(userToCreate).subscribe(
      (createdUser: User) => {
        console.log('Usuario creado:', createdUser);
        this.getUsers(); // Refresca la lista de usuarios
        this.newUser = { id: 0, name: '', surname: '', email: '', username: '', status: '', isExpanded: false };

        this.snackBar.open('Usuario creado exitosamente', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      },
      error => {
        console.error('Error al crear el usuario:', error);
        this.snackBar.open('Error al crear el usuario', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      }
    );
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
  status: string;
  isEditing?: boolean;
  isExpanded?: boolean;
}
