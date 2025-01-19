import { ChangeDetectionStrategy, Component, computed, effect, inject, input, output } from '@angular/core';
import { DEFAULT_PRODOTTO, Prodotto } from '../models/prodotto';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'form-prodotto',
  templateUrl: './form-prodotto.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    FormsModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule
  ],
})
export class FormProdottoComponent {
  public readonly prodotto = input.required<Prodotto>();
  public readonly formSubmit = output<Prodotto>();

  fields: Record<
    keyof Omit<
      Prodotto,
      'id' | 'eoq' | 'reorderPoint' | 'totalCost' | 'utente'
    >,
    { label: string; placeholder: string; col: string; type : 'text'|'number' }
  > = {
    name: {
      label: 'Name',
      placeholder: 'Enter product name',
      col: '3/5',
      type: 'text'
    },
    description: {
      label: 'Description',
      placeholder: 'Enter product description',
      col: '5/6',
      type: 'text'
    },
    annualDemand: {
      label: 'Annual Demand',
      placeholder: 'Enter annual demand',
      col: '1/5',
      type: 'number'
    },
    setupCost: {
      label: 'Setup Cost',
      placeholder: 'Enter setup cost',
      col: '1/5',
      type: 'number'
    },
    holdingCostPerUnit: {
      label: 'Holding Cost Per Unit',
      placeholder: 'Enter holding cost per unit',
      col: '1/5',
      type: 'number'
    },
    unitCost: {
      label: 'Unit Cost',
      placeholder: 'Enter unit cost',
      col: '1/5',
      type: 'number'
    },
    leadTime: {
      label: 'Lead Time',
      placeholder: 'Enter lead time (in days)',
      col: '1/5',
      type: 'number'
    },
  };

  prodottoForm = new FormGroup(
    Object.keys(this.fields).reduce((controls, key) => {
      const fieldKey = key as keyof typeof this.fields;
      /** tutti i campi sono required tranne descrizione */
      const isRequired = this.isRequired(fieldKey);

      controls[fieldKey] = new FormControl(
        DEFAULT_PRODOTTO[fieldKey],
        isRequired ? Validators.required : null
      );

      return controls;
    }, {} as { [key in keyof Prodotto]: FormControl })
  );

  public buttonText = computed(()=> this.prodotto().id.length ? 'Aggiorna prodotto' : 'Crea prodotto')

  protected populateForm = effect(() => {
    this.prodottoForm.patchValue({
      ...this.prodotto(),
    });
  });

  public isRequired(field: string) {
    return field !== 'description';
  }

  public onSubmit(): void {
    if (this.prodottoForm.valid) {
      // lascio tutti quelli non modificabili che mi passa il parent
      const prodotto: Prodotto = {
        ...this.prodotto(),
        ...this.prodottoForm.value,
      };

      this.formSubmit.emit(prodotto);
    }
  }

  public getFieldKeys(): (keyof typeof this.fields)[] {
    return Object.keys(this.fields) as (keyof typeof this.fields)[];
  }
}
