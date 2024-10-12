/* import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserModalPostComponent } from './user-modal-post.component';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('UserModalPostComponent', () => {
  let component: UserModalPostComponent;
  let fixture: ComponentFixture<UserModalPostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserModalPostComponent],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {}  
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {}  
        }
      ],
      imports: [
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
      ]
    });
    fixture = TestBed.createComponent(UserModalPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
 */