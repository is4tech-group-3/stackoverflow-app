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

  displayedColumns: string[] = ['name', 'email', 'type', 'status', 'edit', 'delete'];

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
    this.userService.deleteUser(user.id).subscribe(() => {
      this.getUsers();
    });
  }

  editUser(user: User): void {
    console.log('Editar usuario', user);
  }
}

export interface User {
  id: number;
  name: string;
  email: string;
  type: string;
  status: string;
}
