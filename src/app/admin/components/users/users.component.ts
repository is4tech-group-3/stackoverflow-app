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

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getUsers(this.currentPage, this.pageSize);
  }

  filterUsers(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
  
    const filteredUsers = this.allUsers.filter(user => {
      const nameMatch = `${user.name} ${user.surname}`.toLowerCase().includes(filterValue);
      const emailMatch = user.email.toLowerCase().includes(filterValue);
      return nameMatch || emailMatch;
    });
  
    this.dataSource.data = filteredUsers; 
  
    if (!filterValue) {
      this.dataSource.data = this.allUsers;
    }
  }
  

  editUser(user: User): void {
    user.isEditing = true;
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
          this.getUsers(this.currentPage, this.pageSize); // Refresh the users after disabling
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
        this.getUsers(); // Refresh the users list
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
