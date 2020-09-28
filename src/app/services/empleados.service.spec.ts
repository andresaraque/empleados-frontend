import { TestBed } from '@angular/core/testing';

import { EmpleadosService } from './empleados.service';
import { HttpClientModule } from '@angular/common/http';

describe('EmpleadosService', () => {
  let service: EmpleadosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClientModule]
    });
    service = TestBed.inject(EmpleadosService);
    
  });

  xit('should be created', () => {
    expect(service).toBeTruthy();
  });
});
