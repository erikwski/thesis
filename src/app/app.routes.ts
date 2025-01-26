import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
    canActivate: [AuthGuard],
    children: [
      {
        path: 'prodotti',
        loadComponent: () =>
          import('./pages/prodotti/prodotti.component').then(
            (m) => m.ProdottiComponent
          ),
      },
      {
        path: 'nuovoProdotto',
        loadComponent: () =>
          import('./pages/nuovo-prodotto/nuovo-prodotto.component').then(
            (m) => m.NuovoProdottoComponent
          ),
      },
      {
        path: 'history',
        loadComponent: () =>
          import('./pages/storico/storico.component').then(
            (m) => m.StoricoComponent
          ),
      },
      {
        path: 'benchmark',
        loadComponent: () =>
          import('./pages/benchmark/benchmark.component').then(
            (m) => m.BenchmarkComponent
          ),
      },
      { path: '', redirectTo: 'prodotti', pathMatch: 'full' },
      { path: '**', redirectTo: 'prodotti' },
    ],
  },
  {
    path: 'logout',
    loadComponent: () =>
      import('./logout.component').then((m) => m.LogoutComponent),
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
  { path: '**', redirectTo: 'dashboard' },
];