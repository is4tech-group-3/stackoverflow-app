import { Component, computed, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  collapsed = signal(true);

  sidenavWidth = computed(() => (this.collapsed() ? '65px' : '260px'));

  expandSidenav() {
    this.collapsed.set(false);
  }

  collapseSidenav() {
    this.collapsed.set(true);
  }

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('en');
  }

  switchLanguage(lenguage: string) {
    this.translate.use(lenguage);
  }

  isLanguageDropdownOpen = false;

  toggleLanguageDropdown() {
    this.isLanguageDropdownOpen = !this.isLanguageDropdownOpen;
  }

  closeLanguageDropdown() {
    this.isLanguageDropdownOpen = false;
  }
}
