import { Component, computed, effect, inject, model } from '@angular/core';
import { ProdottiStore } from '../../store/prodotti..store';
import { TableModule, TablePageEvent } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Prodotto } from '../../models/prodotto';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';


type ColonneTabella = {
  titolo: string, 
  campo: keyof Prodotto
}

@Component({
  selector: 'app-prodotti',
  standalone: true,
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
  ],
  templateUrl: './prodotti.component.html',
  styleUrl: './prodotti.component.scss',
})
export class ProdottiComponent {
  public store = inject(ProdottiStore);

  public searchTerm = model('');

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

  public modificaProdotto: Prodotto | null = null;

  public onRowEditInit(prodotto: Prodotto) {
    this.modificaProdotto = prodotto;
  }

  public onRowEditSave(prodotto: Prodotto) {}

  public onRowEditCancel() {
    this.modificaProdotto = null;
  }

  public search() {
    if (this.searchTerm() != this.store.searchTerm()) {
      this.store.search(this.store.page(), this.searchTerm());
    }
  }

  public pageChange(event: PaginatorState) {
    console.warn("event", event);
    
    if (event.rows && event.rows != this.store.pageSize()) {
      // se cambia pageSize
      this.store.changePageSize(event.rows);
    }
    if(event.page != null){
      this.store.search(event.page, this.searchTerm());
    }
  }
}
