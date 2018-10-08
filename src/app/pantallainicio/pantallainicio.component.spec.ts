import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PantallainicioComponent } from './pantallainicio.component';

describe('PantallainicioComponent', () => {
  let component: PantallainicioComponent;
  let fixture: ComponentFixture<PantallainicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PantallainicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PantallainicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
