import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoAuthGuard } from './shared/guards/noAuth/no-auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./security/security.module').then(m => m.SecurityModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [NoAuthGuard]
  },
  {
    path: '',
    loadChildren: () => import('./core/core.module').then(m => m.CoreModule)
  },
  {
    path: '',
    loadChildren: () =>
      import('./operation/operation.module').then(m => m.OperationModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
