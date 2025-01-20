import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, effect, inject, model, OnInit, signal, viewChild } from '@angular/core';
import { ProdottiStore } from '../../store/prodotti..store';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Prodotto } from '../../models/prodotto';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { Paginator, PaginatorModule, PaginatorState } from 'primeng/paginator';
import { MessageModule } from 'primeng/message';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { FormProdottoComponent } from '../../components/form-prodotto/form-prodotto.component';
import { EoqComponent } from '../../components/eoq/eoq.component';


type ColonneTabella = {
  titolo: string, 
  campo: keyof Prodotto
}

@Component({
  selector: 'app-prodotti',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TableModule,
    TagModule,
    SelectModule,
    ButtonModule,
    InputTextModule,
    InputIconModule,
    IconFieldModule,
    ReactiveFormsModule,
    FormsModule,
    PaginatorModule,
    MessageModule,
    ConfirmPopupModule,
    DialogModule,
    FormProdottoComponent,
    EoqComponent
  ],
  providers: [ConfirmationService],
  templateUrl: './prodotti.component.html',
})
export class ProdottiComponent implements AfterViewInit {
  public store = inject(ProdottiStore);
  protected cdr = inject(ChangeDetectorRef);
  protected confirmationService = inject(ConfirmationService);

  protected paginatorEl = viewChild<Paginator>('paginator');

  protected filterChanged = signal(false);

  public mostraModifica = model(false);

  public modificaProdotto = signal<Prodotto | null>(null);

  public searchTerm = model('');

  public emptyMessage = computed(() =>
    this.filterChanged() && this.searchTerm().length
      ? 'Nessun prodotto corrispondente ai filtri di ricerca'
      : 'Non sono stati trovati prodotti legati a questo dipendente, inserisci il primo nella sidebar a sinistra nella sezione aggiungi'
  );

  public disableNoData = computed(() => this.store.prodotti().length == 0);

  public colonneTabella: ColonneTabella[] = [
    {
      titolo: 'Nome',
      campo: 'name',
    },
    {
      titolo: 'Descrizione',
      campo: 'description',
    },
    {
      titolo: 'Domanda annuale',
      campo: 'annualDemand',
    },
    {
      titolo: 'Costo setup',
      campo: 'setupCost',
    },
    {
      titolo: 'Costo mantenimento',
      campo: 'holdingCostPerUnit',
    },
    {
      titolo: 'Costo unitá',
      campo: 'unitCost',
    },
    {
      titolo: 'Tempo di consegna',
      campo: 'leadTime',
    },
  ];

  protected filterChangedEffect = effect(
    () => {
      if (this.searchTerm().length >= 0) this.filterChanged.set(true);
    },
    { allowSignalWrites: true }
  );

  ngAfterViewInit(): void {
    this.filterChanged.set(true);
    if (this.store.prodotti().length > 0 || this.store.page() > 0 ) {
      // store giá presente vecchi record, aggiorno paginator
      this.paginatorEl()!.changePage(this.store.page());
      this.cdr.detectChanges();
    } else {
      this.search();
    }
  }

  public onRowEditInit(prodotto: Prodotto) {
    this.modificaProdotto.set(prodotto);
    this.mostraModifica.set(true);
  }

  public onDeleteProduct(event: Event, prodotto: Prodotto) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: `Confermi di voler eliminare il prodotto ${prodotto.name}?`,
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'Annulla',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Conferma',
        severity: 'danger',
      },
      accept: () => this.store.eliminaProdotto(prodotto.id),
      reject: () => {
        this.store.showMessage('Operazione annullata', 'info');
      },
    });
  }

  public async salvaModifiche(prodotto: Prodotto) {
    await this.store.aggiornaProdotto(prodotto);
    this.modificaProdotto.set(null);
    this.mostraModifica.set(false);
  }

  public search() {
    if (this.filterChanged()) {
      this.filterChanged.set(false);
      this.store.search(this.store.page(), this.searchTerm());
    }
  }

  public pageChange(event: PaginatorState) {
    if (event.rows && event.rows != this.store.pageSize()) {
      // se cambia pageSize
      this.store.changePageSize(event.rows);
    }
    if (event.page != null) {
      this.store.search(event.page, this.searchTerm());
    }
  }
}
