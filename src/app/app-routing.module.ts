import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './pages/list/list.component';
import { RegisterComponent } from './pages/register/register.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/empleados',
    pathMatch: 'full'
  },
  {
    path: 'empleados',
    component: ListComponent
  },
  {
    path: 'empleados/add',
    component: RegisterComponent
  },
  {
    path: 'empleados/edit/:id',
    component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
