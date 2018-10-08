import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpresionEtiquetaComponent } from './impresion-etiqueta.component';

describe('ImpresionEtiquetaComponent', () => {
  let component: ImpresionEtiquetaComponent;
  let fixture: ComponentFixture<ImpresionEtiquetaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpresionEtiquetaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpresionEtiquetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
