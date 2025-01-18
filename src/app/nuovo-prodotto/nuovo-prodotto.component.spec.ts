import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuovoProdottoComponent } from './nuovo-prodotto.component';

describe('NuovoProdottoComponent', () => {
  let component: NuovoProdottoComponent;
  let fixture: ComponentFixture<NuovoProdottoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuovoProdottoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuovoProdottoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
