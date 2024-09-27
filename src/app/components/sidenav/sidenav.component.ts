import { Component, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export type MenuItem = {
  icon: string;
  label: string;
  route: string;
};

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  menuItems = signal<MenuItem[]>([]);

  constructor(private translate: TranslateService) {
    this.loadMenuItems();

    this.translate.onLangChange.subscribe(() => {
      this.loadMenuItems();
    });
  }

  loadMenuItems() {
    this.menuItems.set([
      {
        icon: 'dashboard',
        label: this.translate.instant('Profiles'),
        route: 'profiles'
      },
      {
        icon: 'dashboard',
        label: this.translate.instant('Dashboard'),
        route: 'dashboard'
      }
    ]);
  }
}
