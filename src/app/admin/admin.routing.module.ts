import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilesComponent } from './components/profiles/profiles.component';
import { UsersComponent } from './components/users/users.component';
import { AuditComponent } from './components/audit/audit.component';

const routes: Routes = [
    {
        path: 'profiles', component: ProfilesComponent, data: { showNavbar: true }
    },
    {
        path: 'users', component: UsersComponent, data: { showNavbar: true }
    },
    {
        path: 'audit', component: AuditComponent, data: { showNavbar: true }
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }