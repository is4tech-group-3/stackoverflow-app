import { Component, computed, signal, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin } from 'rxjs';

export type MenuItem = {
  icon: string;
  label: string;
  route: string;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  menuItems = signal<MenuItem[]>([]);

  constructor(private readonly translate: TranslateService) {
    this.loadMenuItems();

    this.translate.onLangChange.subscribe(() => {
      this.loadMenuItems();
    });
  }

  ngOnInit(): void {
    this.loadMenuItems();
  }

  loadMenuItems() {
    forkJoin({
      profileTranslation: this.translate.get('sidebar.profiles'),
      usersTranslation: this.translate.get('sidebar.users'),
      auditTranslation: this.translate.get('sidebar.audit')
    }).subscribe(translations => {
      this.menuItems.set([
        {
          icon: 'admin_panel_settings',
          label: translations.profileTranslation,
          route: 'profiles'
        },
        {
          icon: 'group',
          label: translations.usersTranslation,
          route: 'users'
        },
        {
          icon: 'content_paste',
          label: translations.auditTranslation,
          route: 'audit'
        }
      ]);
    });
  }

  collapsed = signal(true);

  sidenavWidth = computed(() => (this.collapsed() ? '65px' : '250px'));

  expandSidenav() {
    this.collapsed.set(false);
  }

  collapseSidenav() {
    this.collapsed.set(true);
  }
}
