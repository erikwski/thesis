import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProdottiComponent } from './prodotti/prodotti.component';
import { EoqComponent } from './eoq/eoq.component';


export const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'prodotti',
        component: ProdottiComponent,
      },
      {
        path: 'eoq',
        component: EoqComponent,
      },
    ],
  },
];
