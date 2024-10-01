import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserModalComponent } from './user-modal/user-modal.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatPaginator } from '@angular/material/paginator';
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
  dataSource = new MatTableDataSource<User>([]);

  displayedColumns: string[] = ['name', 'surname', 'username', 'email', 'status', 'edit', 'delete'];

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

  getUsers(): void {
    this.userService.getUsers().subscribe(users => {
      this.dataSource.data = users;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(UserModalComponent, {
      width: this.dialogWidth,
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.addUser(result).subscribe(() => {
          this.getUsers();
        });
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  toggleCard(user: User): void {
    this.selectedUser = this.selectedUser === user ? null : user;
  }

  deleteUser(user: User): void {
    const confirmation = confirm(`¿Estás seguro de que deseas eliminar al usuario ${user.name} ${user.surname}?`);
    
    if (confirmation) {
      this.userService.deleteUser(user.id).subscribe(() => {
        this.getUsers();
      }, error => {
        console.error('Error al eliminar el usuario:', error);
      });
    }
  }  

  editUser(user: User): void {
    const dialogRef = this.dialog.open(UserModalComponent, {
      width: this.dialogWidth,
      data: { ...user }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.updateUser(result.id, result).subscribe(() => {
          this.getUsers(); 
        });
      }
    });
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
