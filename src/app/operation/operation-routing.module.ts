import { Routes, RouterModule } from '@angular/router';
import { NewsComponent } from './components/news/news.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { NoAuthGuard } from '../shared/guards/noAuth/no-auth.guard';
import { AnswersComponent } from './components/answers/answers.component';

const routes: Routes = [
  { path: 'news', component: NewsComponent, canActivate: [NoAuthGuard] },
  {
    path: 'questions',
    component: QuestionsComponent,
    canActivate: [NoAuthGuard]
  },
  { path: 'answers/:idQuestion', component: AnswersComponent }
];
export const OperationRoutingModule = RouterModule.forChild(routes);
