import { Routes, RouterModule } from '@angular/router';
import { NewsComponent } from './components/news/news.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { NoAuthGuard } from '../shared/guards/noAuth/no-auth.guard';

const routes: Routes = [
  { path: 'news', component: NewsComponent, canActivate: [NoAuthGuard] },
  {
    path: 'questions',
    component: QuestionsComponent,
    canActivate: [NoAuthGuard]
  }
];
export const OperationRoutingModule = RouterModule.forChild(routes);
