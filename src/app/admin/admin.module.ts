import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin.routing.module';
import { AuditComponent } from './components/audit/audit.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { ProfilesComponent } from './components/profiles/profiles.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { UserModalPostComponent } from './components/users/user-modal-post/user-modal-post.component';
import { UserModalComponent } from './components/users/user-modal/user-modal.component';
import { UsersComponent } from './components/users/users.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuestionModalComponent } from './components/questions/question-modal/question-modal.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    CalendarComponent,
    ProfilesComponent,
    UsersComponent,
    UserModalComponent,
    UserModalPostComponent,
    AuditComponent,
    DashboardComponent,
    QuestionsComponent,
    QuestionModalComponent
  ],
  imports: [SharedModule, AdminRoutingModule, MatDialogModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdminModule {}
