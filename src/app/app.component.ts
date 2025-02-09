import { ChangeDetectionStrategy, Component, computed, effect, inject, model, OnInit, signal } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { GlobalStore } from './store/global.store';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  protected messageService = inject(MessageService);
  public store = inject(GlobalStore);

  codDip = model<string>('');
  nome = model<string>('');

  ngOnInit(): void {
    this.codDip.set(localStorage.getItem('codDip') ?? '');
    if (this.codDip().length) {
      this.store.login(+this.codDip());
    }
  }

  public newUser = computed(
    () => this.store.codDipendente() > 0 && this.store.nome().length === 0
  );

  public showLogin = computed(() => !this.store.loggato());

public validateNumberCodDip = computed<boolean>(() => isNaN(+this.codDip()));

  public disableConfirmCodDip = computed<boolean>(
    () => this.validateNumberCodDip() || this.codDip().length == 0
  );

  public disableSalvaNome = computed<boolean>(() => this.nome().length == 0);

  protected showMessages = effect(() => {
    const message = this.store.message();
    if (message.content) {
      this.messageService.add({
        severity: message.severity,
        summary: message.title,
        detail: message.content,
        life: message.time,
      });
    }
  });

  login() {
    if (this.disableConfirmCodDip()) return;

    localStorage.setItem('codDip', this.codDip());
    this.store.login(+this.codDip(), true);
  }

  salvaNome() {
    if (this.disableSalvaNome()) return;
    
    this.store.aggiornaNome(this.nome());
  }
}
