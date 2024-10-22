import { Component, HostListener, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SessionService } from '../../services/sesion/session.service';
import { Router } from '@angular/router';
import { CookieUtil } from '../../utils/CookieUtil';
import { COOKIE_KEYS, LOCAL_STORAGE_KEYS } from '../../utils/constants.utility';
import { LocalStorageUtility } from '../../utils/LocalStorageUtility';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLanguageDropdownOpen = false;
  isProfileMenuOpen = false;
  username: string = ' ';
  imgUrl: string = '';
  isLoggedIn = false;
  activeLanguage = 'us';
  hasScrolled = false;
  isFixed: boolean = false;

  // Definimos los elementos del menú con roles requeridos
  menuItems = [
    { label: 'navbar.home', link: '/home', roles: [] }, // Acceso para todos
    { label: 'navbar.aboutUs', link: '/about', roles: [] }, // Acceso para todos
    { label: 'navbar.questions', link: '/questions', roles: [] },
    { label: 'navbar.news', link: '/news', roles: [] },
    {
      label: 'navbar.dashboard',
      link: '/admin',
      roles: ['ROLE_ADMIN', 'ROLE_AUDIT']
    }
  ];

  constructor(
    private readonly translate: TranslateService,
    private readonly sessionService: SessionService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.username = CookieUtil.getValue(COOKIE_KEYS.SUB) ?? '';
    this.imgUrl = CookieUtil.getValue(COOKIE_KEYS.IMAGE_URL) ?? '';
    this.activeLanguage =
      this.translate.currentLang || this.translate.getDefaultLang();

    this.translate.onLangChange.subscribe(event => {
      this.activeLanguage = event.lang;
    });

    this.isLoggedIn = this.sessionService.isLoggedIn();

    // Obtener los roles del usuario
    const userRoles = this.sessionService.getUserRoles();

    this.menuItems = this.menuItems.filter(
      item =>
        item.roles.length === 0 ||
        item.roles.some(role => userRoles.includes(role))
    );

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
    LocalStorageUtility.setValue(LOCAL_STORAGE_KEYS.LANGUAGE, language);
    this.translate.use(language);
    setTimeout(() => {
      window.location.reload();
    }, 1500);
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
