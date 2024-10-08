import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserModalComponent } from './user-modal/user-modal.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../../service/user.service';
import { PageEvent } from '@angular/material/paginator';
import { UserModalPostComponent } from './user-modal-post/user-modal-post.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements AfterViewInit {
  isSmallScreen: boolean = false;
  selectedUser: User | null = null;
  users: User[] = [];
  dataSource = new MatTableDataSource<User>([]);

  pageSize = 8;
  currentPage = 0;

  displayedColumns: string[] = ['id', 'name', 'surname', 'username', 'email', 'status', 'edit', 'delete'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dialogWidth = '400px';

  constructor(
    public dialog: MatDialog,
    private breakpointObserver: BreakpointObserver,
    private userService: UserService
  ) {
    this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small])
      .subscribe(result => {
        this.isSmallScreen = result.matches;
        this.dialogWidth = this.isSmallScreen ? '100%' : '400px'; 
      });

    this.getUsers();
  }

  getUsers(page: number = 0, size: number = this.pageSize): void {
    this.userService.getUsersPaginated(page, size).subscribe(
      response => {
        console.log('Usuarios recibidos:', response);
        this.users = response.content;
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

  filterUsers(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const filterValue = inputElement.value ? inputElement.value.trim().toLowerCase() : '';
    this.dataSource.filter = filterValue; 
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(UserModalComponent, {
      width: this.dialogWidth,
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.createUser(result).subscribe((createdUser: User) => {
          this.users.push(createdUser);
          this.dataSource.data = this.users;
        });
      }
    });
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

  editUser(user: User): void {
    const dialogRef = this.dialog.open(UserModalPostComponent, {
      width: this.dialogWidth,
      data: { ...user }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.updateUser(user.id, {
          name: result.name,
          surname: result.surname,
          username: result.username
        }).subscribe(
          (updatedUser: User) => {
            console.log('Usuario actualizado:', updatedUser);
            const index = this.users.findIndex(u => u.id === updatedUser.id);
            if (index !== -1) {
              this.users[index] = updatedUser;
              this.dataSource.data = this.users;
            }
          },
          error => {
            console.error('Error al actualizar el usuario:', error);
          }
        );
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.getUsers();
  }

  toggleCard(user: User): void {
    this.selectedUser = this.selectedUser === user ? null : user;
  }
}

export interface User {
  id: number;
  name: string;
  surname: string;
  username: string;
  email: string;
  status: string;
}
