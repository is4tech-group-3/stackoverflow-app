import { Routes, RouterModule } from '@angular/router';
import { NewsComponent } from './components/news/news.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { NoAuthGuard } from '../shared/guards/noAuth/no-auth.guard';
import { ProfileComponent } from './components/profile/profile.component';
const routes: Routes = [
  { path: 'news', component: NewsComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [NoAuthGuard] },
  { path: 'questions', component: QuestionsComponent }
];
export const OperationRoutingModule = RouterModule.forChild(routes);
