import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MagazzinoComponent } from './magazzino/magazzino.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: 'magazzino',
    component: MagazzinoComponent,
    canActivate: [authGuard],
  },
];
