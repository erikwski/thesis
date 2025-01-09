import { Component, inject, OnInit } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { UserStore } from '../store/user.store';

@Component({
  selector: 'app-magazzino',
  standalone: true,
  templateUrl: './magazzino.component.html',
  styleUrl: './magazzino.component.scss',
})
export class MagazzinoComponent {
  protected user = inject(UserStore);

  get nome (){
    return this.user.nome();
  }
}
