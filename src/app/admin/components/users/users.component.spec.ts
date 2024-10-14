import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersComponent } from './users.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator'; 
import { BreakpointObserver } from '@angular/cdk/layout';
import { of } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http'; 
import { UserService } from '../../service/user.service';  
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatButtonModule,
        MatDialogModule,
        MatPaginatorModule,
        MatTableModule,
        HttpClientModule,
        BrowserAnimationsModule,
        FormsModule,
        MatSnackBarModule,
        TranslateModule.forRoot() 
      ],
      declarations: [UsersComponent],
      providers: [
        UserService,
        {
          provide: BreakpointObserver,
          useValue: {
            observe: () => of({ matches: false })
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open the dialog', () => {
    
  });
});
