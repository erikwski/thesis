import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { StoricoService } from '../../services/storico.service';
import { StoricoStore } from '../../store/storico.store';

@Component({
  selector: 'app-storico',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  providers: [StoricoService],
  templateUrl: './storico.component.html',
})
export class StoricoComponent {
  public store = inject(StoricoStore);

}
