import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { NewsComponent } from './components/news/news.component';
import { OperationRoutingModule } from './operation-routing.module';
import { QuestionsComponent } from './components/questions/questions.component';
import { QuestionModalComponent } from './components/questions/question-modal/question-modal.component';
import { ProfileComponent } from './components/profile/profile.component';
@NgModule({
  declarations: [NewsComponent, QuestionsComponent, QuestionModalComponent, ProfileComponent],
  imports: [SharedModule, OperationRoutingModule]
})
export class OperationModule {}
