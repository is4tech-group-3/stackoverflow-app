import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserModalComponent } from './user-modal/user-modal.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements AfterViewInit {
  isSmallScreen: boolean = false;

  dataSource = new MatTableDataSource<User>([
    { name: 'Cristian Calderon', email: 'cristian@gmail.com', type: 'Admin', status: 'Online' },
  ]);

  displayedColumns: string[] = ['name', 'email', 'type', 'status'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dialogWidth = '400px';

  constructor(
    public dialog: MatDialog,
    private breakpointObserver: BreakpointObserver
  ) {
    this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small])
      .subscribe(result => {
        this.isSmallScreen = result.matches;
        this.dialogWidth = this.isSmallScreen ? '100%' : '400px'; 
      });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(UserModalComponent, {
      width: this.dialogWidth,
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal fue cerrado', result);
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}

export interface User {
  name: string;
  email: string;
  type: string;
  status: string;
}
