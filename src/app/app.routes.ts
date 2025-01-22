import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProdottiComponent } from './pages/prodotti/prodotti.component';
import { LogoutComponent } from './logout.component';
import { NuovoProdottoComponent } from './pages/nuovo-prodotto/nuovo-prodotto.component';
import { BenchmarkComponent } from './pages/benchmark/benchmark.component';
import { StoricoComponent } from './pages/storico/storico.component';


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
        path: 'history',
        component: StoricoComponent,
      },
      {
        path: 'benchMark',
        component: BenchmarkComponent,
      },
      { path: '', redirectTo: 'prodotti', pathMatch: 'full' },
      { path: '**', redirectTo: 'prodotti' },
    ],
  },
  {
    path: 'logout',
    component: LogoutComponent,
  },
];
