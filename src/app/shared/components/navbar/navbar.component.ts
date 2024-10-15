import { Component, HostListener, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SessionService } from '../../services/sesion/session.service';
import { Router } from '@angular/router';
import { CookieUtil } from '../../utils/CookieUtil';
import { COOKIE_KEYS } from '../../utils/constants.utility';
import { LocalStorageUtility } from '../../utils/LocalStorageUtility';
import { LOCAL_STORAGE_KEYS } from '../../utils/constants.utility';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLanguageDropdownOpen = false;
  username: string = ' ';
  isMobileMenuOpen = false;
  isLoggedIn = false;
  activeLanguage = 'us';
  hasScrolled = false;
  isFixed: boolean = false;

  constructor(
    private translate: TranslateService,
    private sessionService: SessionService,
    private router: Router
  ) {}

  ngOnInit() {
    this.username = CookieUtil.getValue(COOKIE_KEYS.SUB) || '';
    this.activeLanguage =
      this.translate.currentLang || this.translate.getDefaultLang();
    this.translate.onLangChange.subscribe(event => {
      this.activeLanguage = event.lang;
    });

    this.isLoggedIn = this.sessionService.isLoggedIn();

    this.router.events.subscribe(() => {
      this.checkStickyNavbar();
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition =
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    this.hasScrolled = scrollPosition > 0;
  }

  checkStickyNavbar() {
    const fixedRoutes = ['/home']; // Añade las rutas que deseas que sean fixed

    this.isFixed = fixedRoutes.includes(this.router.url);
  }

  toggleLanguageDropdown() {
    this.isLanguageDropdownOpen = !this.isLanguageDropdownOpen;
  }

  switchLanguage(language: string) {
    this.translate.use(language);
    LocalStorageUtility.setValue(LOCAL_STORAGE_KEYS.LANGUAGE  , language);
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
