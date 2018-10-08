import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManifiestoAduanasComponent } from './manifiesto-aduanas.component';

describe('ManifiestoAduanasComponent', () => {
  let component: ManifiestoAduanasComponent;
  let fixture: ComponentFixture<ManifiestoAduanasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManifiestoAduanasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManifiestoAduanasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
