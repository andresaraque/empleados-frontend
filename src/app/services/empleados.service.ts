import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Empleado } from './../models/empleado';
import { Observable } from 'rxjs';

const BASE_URL = environment.BASE_URL;


@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  constructor(private http: HttpClient) { }

  getEmpleados(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(`${BASE_URL}/empleados`);
  }
  getEmpleado(id: number) {
    return this.http.get<Empleado>(`${BASE_URL}/empleados/${id}`);
  }
  deleteEmpleado(id: number) {
    return this.http.delete(`${BASE_URL}/empleados/${id}`);
  }
  saveEmpleado(empleado: Empleado) {
    return this.http.post(`${BASE_URL}/empleados`, empleado);
  }
  updateEmpleado(id: number, updatedEmpleado: Empleado) {
    return this.http.put(`${BASE_URL}/empleados/${id}`, updatedEmpleado);
  }


}
