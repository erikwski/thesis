import { ChangeDetectionStrategy, Component, computed, effect, inject, model, OnInit, signal } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { GlobalStore } from './store/global.store';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { EoqService } from './services/eoq.service';

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
  protected router = inject(Router);
  protected messageService = inject(MessageService);
  public store = inject(GlobalStore);
  protected tt = inject(EoqService);

  codDip = model<string>('');
  nome = model<string>('');
  visibile = signal(true);

  ngOnInit(): void {
    this.codDip.set(localStorage.getItem('codDip') ?? '');
    if (this.codDip().length) {
      this.store.login(+this.codDip());
    }

    this.tt.calculateEOQ(1,2,3).then(res=>{
      console.log("WebAssembly EOQ", res);

    })
  }

  public newUser = computed(
    () => this.store.codDipendente() > 0 && this.store.nome().length === 0
  );

  public validateNumberCodDip = computed<boolean>(() => isNaN(+this.codDip()));

  public disableConfirmCodDip = computed<boolean>(
    () => this.validateNumberCodDip() || this.codDip().length == 0
  );

  protected hideModalAndNavigate = effect(
    () => {
      if (this.store.loggato()) {
        this.visibile.set(false);
        this.router.navigate(['dashboard']);
      } else {
        this.visibile.set(true);
      }
    },
    { allowSignalWrites: true }
  );

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
    localStorage.setItem('codDip', this.codDip());
    this.store.login(+this.codDip(), true);
  }

  salvaNome() {
    this.store.aggiornaNome(this.nome());
  }
}
