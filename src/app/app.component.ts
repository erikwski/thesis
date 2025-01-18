import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { UserStore } from './store/user.store';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    InputTextModule,
    ButtonModule,
    DialogModule,
    FormsModule,
    RouterOutlet,
    ProgressSpinnerModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  protected router = inject(Router);
  public user = inject(UserStore);

  codDipendente = '';
  nome = '';
  visibile = signal(true);

  ngOnInit(): void {
    this.codDipendente = localStorage.getItem('codDip') ?? '';
    if (this.codDipendente) {
      this.user.login(this.codDipendente);
    }
  }

  public newUser = computed(
    () => this.user.codDipendente().length > 0 && this.user.nome().length === 0
  );

  public showName = computed(
    () => this.newUser() && this.user.nome().length == 0
  );

  protected hideModal = effect(
    () => {
      if (this.user.codDipendente().length) {
        this.visibile.set(false);
      }
    },
    { allowSignalWrites: true }
  );

  protected navigate = effect(
    () => {
      if (this.user.loggato()) {
        this.router.navigate(['magazzino']);
      }
    },
  );

  login() {
    localStorage.setItem('codDip', this.codDipendente);
    this.user.login(this.codDipendente);
  }

  salvaNome() {
    this.user.aggiornaNome(this.nome);
  }
}
