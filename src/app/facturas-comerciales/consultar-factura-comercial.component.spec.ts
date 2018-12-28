import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturasComercialesComponent } from './consultar-factura-comercial.component';

describe('NewComponentComponent', () => {
  let component: FacturasComercialesComponent;
  let fixture: ComponentFixture<FacturasComercialesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacturasComercialesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturasComercialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
