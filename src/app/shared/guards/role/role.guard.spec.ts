import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastService } from '../../services/toast/toast.service';
import { SessionService } from '../../services/sesion/session.service';
import { RoleGuard } from './role.guard';
import { of } from 'rxjs';

describe('RoleGuard', () => {
  let guard: RoleGuard;
  let sessionService: jasmine.SpyObj<SessionService>;
  let router: jasmine.SpyObj<Router>;
  let toastService: jasmine.SpyObj<ToastService>;
  let translateService: jasmine.SpyObj<TranslateService>;

  beforeEach(() => {
    const sessionServiceSpy = jasmine.createSpyObj('SessionService', ['getUserRoles']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const toastServiceSpy = jasmine.createSpyObj('ToastService', ['showWarningToast']);
    const translateServiceSpy = jasmine.createSpyObj('TranslateService', ['get']);

    TestBed.configureTestingModule({
      providers: [
        RoleGuard,
        { provide: SessionService, useValue: sessionServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ToastService, useValue: toastServiceSpy },
        { provide: TranslateService, useValue: translateServiceSpy },
      ],
    });

    guard = TestBed.inject(RoleGuard);
    sessionService = TestBed.inject(SessionService) as jasmine.SpyObj<SessionService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    toastService = TestBed.inject(ToastService) as jasmine.SpyObj<ToastService>;
    translateService = TestBed.inject(TranslateService) as jasmine.SpyObj<TranslateService>;
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow activation if user has required roles', () => {
    const requiredRoles = ['admin', 'editor'];
    sessionService.getUserRoles.and.returnValue(['admin']);
    const route = { data: { requiredRoles } } as any;
    const state = {} as any;

    const result = guard.canActivate(route, state);

    expect(result).toBe(true);
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should deny activation if user does not have required roles', () => {
    const requiredRoles = ['admin', 'editor'];
    sessionService.getUserRoles.and.returnValue(['viewer']);
    const route = { data: { requiredRoles } } as any;
    const state = {} as any;

    translateService.get.and.returnValue(of('No tienes permiso para acceder.'));
    const result = guard.canActivate(route, state);

    expect(result).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/admin']);
    expect(toastService.showWarningToast).toHaveBeenCalledWith('No tienes permiso para acceder.');
  });
});
