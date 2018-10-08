import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentoImportacionComponent } from './documento-importacion.component';

describe('DocumentoImportacionComponent', () => {
  let component: DocumentoImportacionComponent;
  let fixture: ComponentFixture<DocumentoImportacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentoImportacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentoImportacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
