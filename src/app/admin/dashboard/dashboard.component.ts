import { Component, computed, signal, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin } from 'rxjs';
import { SessionService } from 'src/app/shared/services/sesion/session.service';

export type MenuItem = {
  icon: string;
  label: string;
  route: string;
  roles?: string[]; // Añadir la propiedad roles opcional
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  menuItems = signal<MenuItem[]>([]);
  userRoles = signal<string[]>([]);

  constructor(
    private readonly translate: TranslateService,
    private readonly sessionService: SessionService
  ) {
    this.loadMenuItems();
    this.userRoles.set(this.sessionService.getUserRoles());
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
      auditTranslation: this.translate.get('sidebar.audit'),
      homeTranslation: this.translate.get('sidebar.home')
    }).subscribe(translations => {
      const allMenuItems: MenuItem[] = [
        {
          icon: 'home',
          label: translations.homeTranslation,
          route: 'home',
          roles: ['ROLE_ADMIN', 'ROLE_AUDIT']
        },
        {
          icon: 'admin_panel_settings',
          label: translations.profileTranslation,
          route: 'profiles',
          roles: ['ROLE_PROFILE']
        },
        {
          icon: 'group',
          label: translations.usersTranslation,
          route: 'users',
          roles: ['ROLE_ADMIN']
        },
        {
          icon: 'content_paste',
          label: translations.auditTranslation,
          route: 'audit',
          roles: ['ROLE_AUDIT']
        }
      ];

      const filteredMenuItems = allMenuItems.filter(
        item =>
          !item.roles ||
          item.roles.some(role => this.userRoles().includes(role))
      );

      this.menuItems.set(filteredMenuItems);
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
