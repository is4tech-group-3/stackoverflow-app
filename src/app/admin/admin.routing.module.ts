import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './components/users/users.component';
import { AuditComponent } from './components/audit/audit.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfilesComponent } from './components/profiles/profiles.component';
import { QuestionsComponent } from './components/questions/questions.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'users', pathMatch: 'full' },
      { path: 'users', component: UsersComponent },
      { path: 'profiles', component: ProfilesComponent },
      { path: 'audit', component: AuditComponent },
      { path: 'questions', component: QuestionsComponent }
    ],
    data: { showNavbar: true }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
