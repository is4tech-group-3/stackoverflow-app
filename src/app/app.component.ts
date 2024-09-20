import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showNavbar = true;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
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
