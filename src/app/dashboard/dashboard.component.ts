import { Component, computed, inject, model } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { BadgeModule } from 'primeng/badge';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { GlobalStore } from '../store/global.store';
import { NgTemplateOutlet } from '@angular/common';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-dasboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  standalone: true,
  imports: [
    MenuModule,
    BadgeModule,
    RippleModule,
    AvatarModule,
    RouterLink,
    RouterOutlet,
    NgTemplateOutlet,
    DrawerModule,
    ButtonModule,
    RouterLinkActive
  ],
})
export class DashboardComponent {
  public store = inject(GlobalStore);

  public visible = model(false);

  public iniziale = computed(() => this.store.nome()[0]);

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
}
