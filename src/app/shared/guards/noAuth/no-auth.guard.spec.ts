import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';  // Importa 'of' para crear observables simulados.
import { SessionService } from '../../services/sesion/session.service';
import { ToastService } from '../../services/toast/toast.service';
import { NoAuthGuard } from './no-auth.guard';

describe('NoAuthGuard', () => {
  let guard: NoAuthGuard;
  let sessionServiceSpy: jasmine.SpyObj<SessionService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let toastServiceSpy: jasmine.SpyObj<ToastService>;
  let translateServiceSpy: jasmine.SpyObj<TranslateService>;

  beforeEach(() => {
    const sessionServiceMock = jasmine.createSpyObj('SessionService', ['isLoggedIn']);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);
    const toastServiceMock = jasmine.createSpyObj('ToastService', ['showWarningToast']);
    const translateServiceMock = jasmine.createSpyObj('TranslateService', ['get']);

    TestBed.configureTestingModule({
      providers: [
        NoAuthGuard,
        { provide: SessionService, useValue: sessionServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: ToastService, useValue: toastServiceMock },
        { provide: TranslateService, useValue: translateServiceMock },
      ]
    });

    guard = TestBed.inject(NoAuthGuard);
    sessionServiceSpy = TestBed.inject(SessionService) as jasmine.SpyObj<SessionService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    toastServiceSpy = TestBed.inject(ToastService) as jasmine.SpyObj<ToastService>;
    translateServiceSpy = TestBed.inject(TranslateService) as jasmine.SpyObj<TranslateService>;
  });

  it('should allow activation if the user is logged in', () => {
    sessionServiceSpy.isLoggedIn.and.returnValue(true);

    const result = guard.canActivate();

    expect(result).toBeTrue();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should not allow activation if the user is not logged in', () => {
    sessionServiceSpy.isLoggedIn.and.returnValue(false);
    translateServiceSpy.get.and.returnValue(of('warning.notLoggedIn')); // Simulación correcta de un Observable.

    const result = guard.canActivate();

    expect(result).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['auth/login']);
    expect(toastServiceSpy.showWarningToast).toHaveBeenCalledWith('warning.notLoggedIn');
  });
});
