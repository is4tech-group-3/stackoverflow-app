import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuditComponent } from './audit.component';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModalService } from 'src/app/shared/components/modal/service/modal.service';
import { AuditService } from '../../service/audit/audit.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
describe('AuditComponent', () => {
  let component: AuditComponent;
  let fixture: ComponentFixture<AuditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuditComponent],
      imports: [SharedModule, HttpClientModule, TranslateModule.forRoot(), BrowserAnimationsModule],
      providers: [TranslateService, ModalService, AuditService]
    });
    fixture = TestBed.createComponent(AuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
