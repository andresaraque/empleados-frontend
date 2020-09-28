import { Component, OnInit } from '@angular/core';
import { EmpleadosService } from '../../services/empleados.service';
import { Empleado } from '../../models/empleado';
import Swal from 'sweetalert2/src/sweetalert2.js'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  empleados: Empleado[] = [];
  loading: boolean = true;

  constructor(public empleadoService: EmpleadosService) { }
  ngOnInit(): void {
    this.getEmpleados();
  }

  getEmpleados(): void {
    this.empleadoService.getEmpleados().subscribe(
      empleados => {
        this.loading = false;
        this.empleados = empleados;
      },
      err => {
        this.swalError(err);
      }
    )
  }

  deleteEmpleado(id: number) {
    Swal.fire({
      title: '¿Estas seguro?',
      text: "No puedes revertir esto",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d9534f',
      cancelButtonColor: '#1a1a1a',
      confirmButtonText: 'SI',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.empleadoService.deleteEmpleado(id).subscribe(
          (res: any) => {
            Swal.fire({
              title: 'Eliminado!',
              text: res.msg,
              icon: 'success',
              confirmButtonColor: '#1a1a1a'
            })
            this.loading = true;
            this.getEmpleados();
          },
          err => this.swalError(err)
        )
      }
    });
  }

  swalError(err) {
    Swal.fire(
      'Error',
       err.msg,
      'error'
    );
  }

}
