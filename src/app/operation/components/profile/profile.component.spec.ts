import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserService } from 'src/app/admin/service/user.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { BlockUIService } from 'src/app/shared/services/blockUI/block-ui.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core'; 
import { MatIconModule } from '@angular/material/icon';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        MatIconModule,
        TranslateModule.forRoot()  
      ],
      providers: [
        UserService,
        ToastService,
        BlockUIService,
        TranslateService  
      ]
    });

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
