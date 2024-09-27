import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent {
  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('en');
  }

  switchLenguage(lenguage: string) {
    this.translate.use(lenguage);
  }
}
