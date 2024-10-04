import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin.routing.module';
import { SharedModule } from '../shared/shared.module';
import { AuditComponent } from './components/audit/audit.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { ProfilesComponent } from './components/profiles/profiles.component';
import { UserModalComponent } from './components/users/user-modal/user-modal.component';
import { UsersComponent } from './components/users/users.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { QuestionsComponent } from './components/questions/questions.component';

@NgModule({
  declarations: [
    CalendarComponent,
    ProfilesComponent,
    UsersComponent,
    UserModalComponent,
    AuditComponent,
    DashboardComponent,
    QuestionsComponent
  ],
  imports: [SharedModule, AdminRoutingModule, MatMenuModule, MatIconModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdminModule {}
