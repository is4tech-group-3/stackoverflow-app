import { Routes, RouterModule } from '@angular/router';
import { NewsComponent } from './components/news/news.component';

const routes: Routes = [
  { path: 'news', component: NewsComponent }
];

export const OperationRoutingModule = RouterModule.forChild(routes);
