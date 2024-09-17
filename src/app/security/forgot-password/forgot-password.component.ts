import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Messages } from 'primeng/messages';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  items: MenuItem[] = [];
  activeIndex: number = 0;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.items = [
      {
        label: 'Password Recovery',
      },
      {
        label: 'Password Change',
      }
    ];

    // Update activeIndex based on the current route
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const currentRoute = this.activatedRoute.firstChild?.snapshot.url[0]?.path;

      if (currentRoute === 'email') {
        this.activeIndex = 0;
      } else if (currentRoute === 'password-change') {
        this.activeIndex = 1;
      }
    });
  }
}
