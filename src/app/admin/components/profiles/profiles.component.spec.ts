import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfilesComponent } from './profiles.component';
import { PaginatorModule } from 'primeng/paginator';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ProfilesComponent', () => {
  let component: ProfilesComponent;
  let fixture: ComponentFixture<ProfilesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilesComponent],
      imports: [PaginatorModule], 
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents(); 
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
