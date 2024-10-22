import { Routes, RouterModule } from '@angular/router';
import { NewsComponent } from './components/news/news.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { NoAuthGuard } from '../shared/guards/noAuth/no-auth.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { AnswersComponent } from './components/answers/answers.component';
import { AddNewComponent } from './components/news/add-new/add-new.component';
import { NewsDetailComponent } from './components/news-detail/news-detail.component';

const routes: Routes = [
  { path: 'news', component: NewsComponent },
  { path: 'news-detail/:id', component: NewsDetailComponent },
  { path: 'add-new', component: AddNewComponent, canActivate: [NoAuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [NoAuthGuard] },
  { path: 'questions', component: QuestionsComponent },
  { path: 'answers/:idQuestion', component: AnswersComponent }
];
export const OperationRoutingModule = RouterModule.forChild(routes);
