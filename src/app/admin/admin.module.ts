import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin.routing.module';
import { AuditComponent } from './components/audit/audit.component';
import { ProfilesComponent } from './components/profiles/profiles.component';
/* import { UserModalPostComponent } from './components/users/user-modal-post/user-modal-post.component';
import { UserModalComponent } from './components/users/user-modal/user-modal.component'; */
import { UsersComponent } from './components/users/users.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    ProfilesComponent,
    UsersComponent,
    /*     UserModalComponent,
    UserModalPostComponent, */
    AuditComponent,
    DashboardComponent
  ],
  imports: [SharedModule, AdminRoutingModule, MatDialogModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdminModule {}
