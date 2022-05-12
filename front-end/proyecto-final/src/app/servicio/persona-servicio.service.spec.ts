import { TestBed } from '@angular/core/testing';

import { PersonaServicioService } from './persona-servicio.service';

describe('PersonaServicioService', () => {
  let service: PersonaServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonaServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
