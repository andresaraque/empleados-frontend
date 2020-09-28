import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';
import { EmpleadosService } from '../../services/empleados.service';
import { HttpClientModule } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Empleado } from 'src/app/models/empleado';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let empleadosServiceMock: any;

  beforeEach(async(() => {
    empleadosServiceMock = jasmine.createSpyObj('EmpleadosService', ['getEmpleados']);
    empleadosServiceMock.getEmpleados.and.returnValue(of([]));
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ ListComponent ],
      providers: [
      {provide: EmpleadosService, useValue: empleadosServiceMock}
      ]
    })
    .compileComponents();
    
  }));

  let helper: Helper;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    helper = new Helper();
  });
  

  describe('LLamado en el NgOnInit de getEmpleados()', () => {
    
    it('Deberia llamar getEmpleados al tiempo de ngOnInit', () => {
      fixture.detectChanges();
      expect(empleadosServiceMock.getEmpleados).toHaveBeenCalledTimes(1);
    })

    it('Deberia llenar el arreglo empleados cuando termina de cargar', () => {
      empleadosServiceMock.getEmpleados.and.returnValue(helper.getEmpleados(1));
      fixture.detectChanges();
      expect(helper.empleados.length > 0).toBeTruthy();
    })

  })

  class Helper {
    empleados: Empleado[] = [];
    getEmpleados(cantidad): Observable<Empleado[]> {
      for (let i = 0; i < cantidad; i++) {
        this.empleados.push(
          {Nombre: 'name' + i, Salario: 4500 + i, Cargo: 'worker' + i, Img: 'http://jfkldjfkdjsf' + i}
        );
      }
      return of(this.empleados)
    }
  }




});


