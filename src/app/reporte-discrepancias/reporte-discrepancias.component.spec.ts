import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteDiscrepanciasComponent } from './reporte-discrepancias.component';

describe('ReporteDiscrepanciasComponent', () => {
  let component: ReporteDiscrepanciasComponent;
  let fixture: ComponentFixture<ReporteDiscrepanciasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteDiscrepanciasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteDiscrepanciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
