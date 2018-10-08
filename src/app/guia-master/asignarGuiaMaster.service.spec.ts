import { TestBed } from '@angular/core/testing';

import { AsignarGuiaMasterService } from './asignarGuiaMaster.service';

describe('AsignarGuiaMasterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AsignarGuiaMasterService = TestBed.get(AsignarGuiaMasterService);
    expect(service).toBeTruthy();
  });
});
