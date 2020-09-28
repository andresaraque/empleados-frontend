import { Component, OnInit, LOCALE_ID, Inject} from '@angular/core';
import { Empleado } from '../../models/empleado';
import { EmpleadosService } from '../../services/empleados.service';
import { formatNumber } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { element } from 'protractor';
import Swal from 'sweetalert2/src/sweetalert2.js'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  empleado: Empleado = {
    Id: 0,
    Nombre: '',
    Salario: null,
    Cargo: '',
    Img: ''
  };
  loading: boolean;

  edit: boolean = false;
  l= '5';

  constructor(public empleadoService: EmpleadosService,
              @Inject(LOCALE_ID) private locale: string,
              private router: Router,
              private activatedRouter: ActivatedRoute) { }

  ngOnInit(): void {
    // this.fcn(this.l);
    const id = this.activatedRouter.snapshot.params.id;
    if (id) {
      this.loading = true;
      this.empleadoService.getEmpleado(id).subscribe(
        res => {
          this.loading = false;
          this.empleado = res;
          this.edit = true;
        },
        err => this.swalError(err)
      )
    }
  }
  fcn(num) {
    console.log(num);
    // console.log(Number.isInteger(num));
    // return Number.isInteger(num);
  }

  saveEmpleado() {
    if (Number.isNaN(this.empleado.Salario) || this.empleado.Salario === null) {
      Swal.fire({
        title: '¡Advertencia!',
        text: 'ingrese solo números en el salario Laboral',
        icon: 'error',
        confirmButtonColor: '#1a1a1a',
        confirmButtonText: 'OK',            
      })      
    } else if (this.empleado.Img.length < 30) {
      Swal.fire({
        title: '¡Advertencia!',
        text: 'Ingrese una imagen valida Ej: http:///page.com/400x400.jpg',
        icon: 'error',
        confirmButtonColor: '#1a1a1a',
        confirmButtonText: 'OK',            
      })  
    } else {
      delete this.empleado.Id;
      this.empleadoService.saveEmpleado(this.empleado).subscribe(
        (res: any) => {
          console.log(res);
          Swal.fire({
            title: '¡OK!',
            text: res.msg,
            icon: 'success',
            confirmButtonColor: '#1a1a1a',
            confirmButtonText: 'OK',            
          })
          this.router.navigate(['/empleados']);
        },
        err => {
          this.empleado.Img = '';
          this.swalError(err);
        }
      )
    }
  }

  updateEmpleado() {
    this.empleadoService.updateEmpleado(this.empleado.Id, this.empleado).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/empleados']);
      }, err => this.swalError(err)
    )
  }
    // Funcion que convierte numero a string colocando comas
    transfomarNumero(numero) {
      return formatNumber(numero, this.locale);
    }

    quitarComa(event): void {
      event = event.replace(/,/g, "");
      this.empleado.Salario = parseInt(event);
    }

    swalError(err) {
      Swal.fire({
        title:'Error',
        text: err.msg,
        icon:'error',
        confirmButtonColor: '#1a1a1a',
        confirmButtonText: 'OK'
      });
    }

}
