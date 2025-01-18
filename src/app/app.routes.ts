import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProdottiComponent } from './prodotti/prodotti.component';
import { EoqComponent } from './eoq/eoq.component';
import { LogoutComponent } from './logout.component';
import { NuovoProdottoComponent } from './nuovo-prodotto/nuovo-prodotto.component';


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
        path: 'nuovoProdotto',
        component: NuovoProdottoComponent,
      },
      {
        path: 'eoq',
        component: EoqComponent,
      },
      {path: '', redirectTo: 'prodotti', pathMatch: 'full'},
      {path: '**', redirectTo: 'prodotti'}
    ],
  },
  {
    path: 'logout',
    component: LogoutComponent,
  },
];
