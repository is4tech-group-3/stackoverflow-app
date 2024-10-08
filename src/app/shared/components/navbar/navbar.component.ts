import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SessionService } from 'src/app/shared/services/sesion/session.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLanguageDropdownOpen = false;
  isMobileMenuOpen = false;
  isLoggedIn = false;
  activeLanguage = 'us';

  constructor(
    private translate: TranslateService,
    private sessionService: SessionService,
    private router: Router
  ) {}

  ngOnInit() {
    this.activeLanguage =
      this.translate.currentLang || this.translate.getDefaultLang();
    this.translate.onLangChange.subscribe(event => {
      this.activeLanguage = event.lang;
    });

    this.isLoggedIn = this.sessionService.isLoggedIn();
  }

  toggleLanguageDropdown() {
    this.isLanguageDropdownOpen = !this.isLanguageDropdownOpen;
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeLanguageDropdown() {
    this.isLanguageDropdownOpen = false;
  }

  logout() {
    this.isLoggedIn = false;
    this.sessionService.logout();
  }
}
