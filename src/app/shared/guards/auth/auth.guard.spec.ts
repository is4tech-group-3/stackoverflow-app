import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';  // Importamos 'of' para mockear observables
import { SessionService } from '../../services/sesion/session.service';
import { ToastService } from '../../services/toast/toast.service';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let sessionServiceSpy: jasmine.SpyObj<SessionService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let toastServiceSpy: jasmine.SpyObj<ToastService>;
  let translateServiceSpy: jasmine.SpyObj<TranslateService>;

  beforeEach(() => {
    // Creamos mocks para los servicios utilizados en el guardia
    const sessionServiceMock = jasmine.createSpyObj('SessionService', ['isLoggedIn']);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);
    const toastServiceMock = jasmine.createSpyObj('ToastService', ['showWarningToast']);
    const translateServiceMock = jasmine.createSpyObj('TranslateService', ['get']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: SessionService, useValue: sessionServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: ToastService, useValue: toastServiceMock },
        { provide: TranslateService, useValue: translateServiceMock },
      ]
    });

    // Inyectamos la instancia del guardia
    guard = TestBed.inject(AuthGuard);
    sessionServiceSpy = TestBed.inject(SessionService) as jasmine.SpyObj<SessionService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    toastServiceSpy = TestBed.inject(ToastService) as jasmine.SpyObj<ToastService>;
    translateServiceSpy = TestBed.inject(TranslateService) as jasmine.SpyObj<TranslateService>;
  });

  it('should not allow activation if the user is logged in', () => {
    sessionServiceSpy.isLoggedIn.and.returnValue(true);
    translateServiceSpy.get.and.returnValue(of('warning.alreadyLoggedIn')); // Simulamos un Observable

    const result = guard.canActivate();

    expect(result).toBeFalse();  // El guardia debe retornar false si el usuario está logueado
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']);  // Debe redirigir a '/home'
    expect(toastServiceSpy.showWarningToast).toHaveBeenCalledWith('warning.alreadyLoggedIn');
  });

  it('should allow activation if the user is not logged in', () => {
    sessionServiceSpy.isLoggedIn.and.returnValue(false);

    const result = guard.canActivate();

    expect(result).toBeTrue();  // El guardia debe retornar true si el usuario no está logueado
    expect(routerSpy.navigate).not.toHaveBeenCalled();  // No debe haber redirección
    expect(toastServiceSpy.showWarningToast).not.toHaveBeenCalled();  // No debe mostrar un toast
  });
});
