import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilesComponent } from './profiles/profiles.component';

const routes: Routes = [
    {
        path: 'profiles', component: ProfilesComponent, data: { showNavbar: true }
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }