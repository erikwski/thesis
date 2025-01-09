import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MagazzinoComponent } from './magazzino/magazzino.component';
import { AuthGuard } from './auth.guard';


export const routes: Routes = [
  {
    path: 'magazzino',
    component: MagazzinoComponent,
    canActivate: [AuthGuard],
  },
];
