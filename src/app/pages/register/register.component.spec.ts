import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { HttpClientModule } from '@angular/common/http';
import { EmpleadosService } from '../../services/empleados.service';
import { RouterTestingModule } from '@angular/router/testing';
import { throwError } from 'rxjs';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      declarations: [ RegisterComponent ],
      providers: [EmpleadosService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Cuando saveEmpleado() es llamado', () => {

    it('Advertencia si el salario es null', () => {
      component.empleado.Salario = null;
      component.saveEmpleado();
      expect(component.empleado.Salario === null).toBeTruthy();
    })

    it('Advertencia si la img no tine almenos 30 caracteres', () => {
      component.empleado.Img = 'http://www.page.co/jji.jpg';
      component.saveEmpleado();
      expect(component.empleado.Img.length < 30).toBeTruthy();
    })


    it('Advertir de error y restablecer objeto', () => {
      spyOn(component.empleadoService, 'saveEmpleado').and.returnValue(throwError({error: 'error'}));
      component.saveEmpleado();
      expect(component.empleado.Img === '' && component.empleado.Nombre === '').toBeTruthy();
    })


  })
});
