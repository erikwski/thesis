import { Component, inject, OnInit } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { GlobalStore } from '../store/global.store';

@Component({
  selector: 'app-magazzino',
  standalone: true,
  templateUrl: './magazzino.component.html',
  styleUrl: './magazzino.component.scss',
})
export class MagazzinoComponent {
  protected store = inject(GlobalStore);

  get nome (){
    return this.store.nome();
  }
}
