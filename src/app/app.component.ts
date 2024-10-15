import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageUtility } from './shared/utils/LocalStorageUtility';
import { LOCAL_STORAGE_KEYS } from './shared/utils/constants.utility';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showNavbar = true;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private translate: TranslateService
  ) {
    const savedLang =
      LocalStorageUtility.getValue(LOCAL_STORAGE_KEYS.LANGUAGE) || 'es';
    this.translate.setDefaultLang(savedLang);
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateNavbarVisibility();
      }
    });
  }

  updateNavbarVisibility() {
    let route = this.activatedRoute.firstChild;
    while (route?.firstChild) {
      route = route.firstChild;
    }

    if (route?.snapshot.data['showNavbar'] !== undefined) {
      this.showNavbar = route.snapshot.data['showNavbar'];
    } else {
      this.showNavbar = true;
    }
  }
}
