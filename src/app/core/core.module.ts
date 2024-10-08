import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import player from 'lottie-web';
import { SharedModule } from '../shared/shared.module';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';
import { CoreRoutingModule } from './core-routing.module'; // Importa el archivo de rutas

export function playerFactory() {
  return player;
}

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [HomeComponent, AboutComponent],
  imports: [
    CoreRoutingModule,
    SharedModule,

  ]
})
export class CoreModule {}
