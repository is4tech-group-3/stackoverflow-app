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
  isProfileMenuOpen = false;
  username: string = ' ';
  isLoggedIn = false;
  activeLanguage = 'us';
  hasScrolled = false;
  isFixed: boolean = false;
  menuItems = [
    { label: 'navbar.home', link: '/home' },
    { label: 'navbar.aboutUs', link: '/about' },
    { label: 'navbar.questions', link: '/questions', requiresLogin: true },
    { label: 'navbar.news', link: '/news', requiresLogin: true }
  ];

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

    this.menuItems = this.isLoggedIn
      ? this.menuItems
      : this.menuItems.filter(item => !item.requiresLogin);

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
    const fixedRoutes = ['/home'];

    this.isFixed = fixedRoutes.includes(this.router.url);
  }

  toggleProfileMenu() {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }
  closeProfileMenu() {
    this.isProfileMenuOpen = false;
  }

  toggleLanguageDropdown() {
    this.isLanguageDropdownOpen = !this.isLanguageDropdownOpen;
  }

  closeLanguageDropdown() {
    this.isLanguageDropdownOpen = false;
  }
  switchLanguage(language: string) {
    this.translate.use(language);
    LocalStorageUtility.setValue(LOCAL_STORAGE_KEYS.LANGUAGE, language);
  }

  logout() {
    this.isLoggedIn = false;
    this.sessionService.logout();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (
      !target.closest('.profile-menu') &&
      !target.closest('.profile-button')
    ) {
      this.isProfileMenuOpen = false;
    }
  }
}
