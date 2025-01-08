import { Component, OnInit } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-magazzino',
  imports: [ProgressSpinnerModule],
  templateUrl: './magazzino.component.html',
  styleUrl: './magazzino.component.scss',
})
export class MagazzinoComponent implements OnInit {
  codDipendente = '';

  ngOnInit(): void {
    this.codDipendente = localStorage.getItem('user') ?? '';
  }
}
