import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsComponent } from './components/news/news.component';
import { SharedModule } from '../shared/shared.module';
import { OperationRoutingModule } from './operation-routing.module';

@NgModule({
  declarations: [NewsComponent],
  imports: [SharedModule, OperationRoutingModule]
})
export class OperationModule {}
