import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './components/users/users.component';
import { AuditComponent } from './components/audit/audit.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfilesComponent } from './components/profiles/profiles.component';
import { NoAuthGuard } from '../shared/guards/noAuth/no-auth.guard';
import { RoleGuard } from '../shared/guards/role/role.guard';
import { HomeComponent } from './components/home/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [NoAuthGuard, RoleGuard],
    data: { showNavbar: true, requiredRoles: ['ROLE_ADMIN', 'ROLE_AUDIT'] },
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [RoleGuard],
        data: { requiredRoles: ['ROLE_ADMIN', 'ROLE_AUDIT'] }
      },
      {
        path: 'users',
        component: UsersComponent,
        canActivate: [RoleGuard],
        data: { requiredRoles: ['ROLE_ADMIN'] }
      },
      {
        path: 'profiles',
        component: ProfilesComponent,
        canActivate: [RoleGuard],
        data: { requiredRoles: ['ROLE_PROFILE'] }
      },
      {
        path: 'audit',
        component: AuditComponent,
        canActivate: [RoleGuard],
        data: { requiredRoles: ['ROLE_AUDIT'] }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
