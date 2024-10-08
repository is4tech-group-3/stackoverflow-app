import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { CoreRoutingModule } from './core-routing.module'; // Importa el archivo de rutas
import { SharedModule } from '../shared/shared.module';
import { AboutComponent } from './components/about/about.component';

@NgModule({
  declarations: [HomeComponent, AboutComponent],
  imports: [CoreRoutingModule, SharedModule]
})
export class CoreModule {}
