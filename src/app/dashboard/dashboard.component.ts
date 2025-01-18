import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { BadgeModule } from 'primeng/badge';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dasboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  imports: [MenuModule, BadgeModule, RippleModule, AvatarModule, RouterLink],
})
export class DashboardComponent {
  items: MenuItem[] = [
    {
      separator: true,
    },
    {
      label: 'Prodotti',
      items: [
        {
          label: 'Lista',
          icon: 'pi pi-search',
          route: '/dashboard/prodotti',
        },
        {
          label: 'Aggiungi',
          icon: 'pi pi-plus',
          route: '/dashboard/nuovoProdotto',
        },
        {
          label: 'Eoq',
          icon: 'pi pi-calculator',
          route: '/dashboard/eoq',
        },
      ],
    },
    {
      label: 'Utente',
      items: [
        {
          label: 'Logout',
          icon: 'pi pi-sign-out',
          route: '/logout',
        },
      ],
    },

    {
      separator: true,
    },
  ];

  protected logout() {
    console.warn('logout');
  }
}
