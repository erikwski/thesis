import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { GlobalStore } from './store/global.store';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    InputTextModule,
    ButtonModule,
    DialogModule,
    FormsModule,
    RouterOutlet,
    ProgressSpinnerModule,
    Toast,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [MessageService],
})
export class AppComponent implements OnInit {
  protected router = inject(Router);
  protected messageService = inject(MessageService);
  public store = inject(GlobalStore);

  codDipendente = '';
  nome = '';
  visibile = signal(true);

  ngOnInit(): void {
    this.codDipendente = localStorage.getItem('codDip') ?? '';
    if (this.codDipendente) {
      this.store.login(this.codDipendente);
    }
  }

  public newUser = computed(
    () =>
      this.store.codDipendente().length > 0 && this.store.nome().length === 0
  );

  public showName = computed(
    () => this.newUser() && this.store.nome().length == 0
  );

  protected hideModal = effect(
    () => {
      if (this.store.codDipendente().length) {
        this.visibile.set(false);
      }
    },
    { allowSignalWrites: true }
  );

  protected showMessages = effect(() => {
    const message = this.store.message();
    if(message.content){
      this.messageService.add({
        severity: message.severity,
        summary: message.title,
        detail: message.content,
        life: message.time
      });
    }
  });

  protected navigate = effect(() => {
    if (this.store.loggato()) {
      this.router.navigate(['magazzino']);
    }
  });

  login() {
    localStorage.setItem('codDip', this.codDipendente);
    this.store.login(this.codDipendente);
  }

  salvaNome() {
    this.store.aggiornaNome(this.nome);
  }
}
