import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements AfterViewInit {
  isSmallScreen: boolean = false;
  selectedUser: User | null = null;
  users: User[] = [];
  dataSource = new MatTableDataSource<User>([]); // Data source for paginated users

  pageSize = 8;
  currentPage = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // Objeto para el nuevo usuario
  newUser: User = {
    id: 0, // Inicializar id en 0
    name: '',
    surname: '',
    username: '',
    email: '',
    status: '',
    isExpanded: false // Inicialización de isExpanded
  };

  constructor(
    private breakpointObserver: BreakpointObserver,
    private userService: UserService
  ) {
    this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small])
      .subscribe(result => {
        this.isSmallScreen = result.matches;
      });

    this.getUsers();
  }

  getUsers(page: number = 0, size: number = this.pageSize): void {
    this.userService.getUsersPaginated(page, size).subscribe(
      response => {
        console.log('Usuarios recibidos:', response);
        // Inicializa isExpanded en false para cada usuario
        this.users = response.content.map((user: User) => ({ ...user, isExpanded: false })); // Especifica el tipo User
        this.dataSource.data = this.users;
        this.paginator.length = response.totalElements;
        this.paginator.pageIndex = response.number;
        this.paginator.pageSize = response.size;
      },
      error => {
        console.error('Error al obtener los usuarios', error);
      }
    );
  }
  

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getUsers(this.currentPage, this.pageSize); 
  }

  // Filtro de usuarios basado en la entrada del usuario
  filterUsers(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  // Editar usuario directamente en el perfil
  editUser(user: User): void {
    user.isEditing = true;  // Activamos el modo edición para el usuario
  }

  // Guardar cambios después de editar
  saveUser(user: User): void {
    this.userService.updateUser(user.id, {
      name: user.name,
      surname: user.surname,
      username: user.username,
      email: user.email,
      status: user.status
    }).subscribe(
      (updatedUser: User) => {
        console.log('Usuario actualizado:', updatedUser);
        user.isEditing = false;  // Desactivamos el modo edición
      },
      error => {
        console.error('Error al actualizar el usuario:', error);
      }
    );
  }

  deleteUser(user: User): void {
    if (!user.id) {
      console.error('El usuario no tiene un ID válido:', user);
      return;
    }

    const confirmation = confirm(`¿Estás seguro de que deseas eliminar al usuario ${user.name} ${user.surname}?`);

    if (confirmation) {
      this.userService.deleteUser(user.id).subscribe(
        () => {
          console.log('Usuario eliminado');
          this.users = this.users.filter(u => u.id !== user.id);
          this.dataSource.data = this.users;
        },
        error => {
          console.error('Error al eliminar el usuario:', error);
        }
      );
    }
  }

  // Método para agregar un nuevo usuario
  addUser(): void {
    // Asignamos el status por defecto como "true"
    const userToCreate = { ...this.newUser, status: 'true' };
  
    this.userService.createUser(userToCreate).subscribe(
      (createdUser: User) => {
        console.log('Usuario creado:', createdUser);
        this.users.push(createdUser); // Agregar el nuevo usuario a la lista
        this.dataSource.data = this.users; // Actualiza la fuente de datos
        // Resetear el formulario
        this.newUser = { id: 0, name: '', surname: '', username: '', email: '', status: '', isExpanded: false };
      },
      error => {
        console.error('Error al crear el usuario:', error);
      }
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.getUsers();
  }
}

// Interfaz User
export interface User {
  id: number;
  name: string;
  surname: string;
  username: string;
  email: string;
  status: string;
  isEditing?: boolean;  // Añadido para el modo edición
  isExpanded?: boolean;  // Añadir para el estado expandido
}
