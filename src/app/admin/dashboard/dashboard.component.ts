import { Component, computed, signal, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

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

  constructor(private translate: TranslateService) {
    this.loadMenuItems();

    this.translate.onLangChange.subscribe(() => {
      this.loadMenuItems();
    });
  }

  ngOnInit(): void {
    this.loadMenuItems();
  }
  loadMenuItems() {
    this.menuItems.set([
      {
        icon: 'admin_panel_settings',
        label: this.translate.instant('sidebar.profiles'),
        route: 'profiles'
      },
      {
        icon: 'group',
        label: this.translate.instant('sidebar.users'),
        route: 'users'
      },
      {
        icon: 'content_paste',
        label: this.translate.instant('sidebar.audit'),
        route: 'audit'
      }
    ]);
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
