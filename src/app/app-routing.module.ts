import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonaListaComponent } from './persona-lista/persona-lista.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {path: 'login', component: LoginComponent, pathMatch: 'full'},
  {path: 'register', component: RegisterComponent, pathMatch: 'full'},
  {path: 'hospitales', component: HospitalesComponent, pathMatch: 'full'},
  {path: 'medicos', component: MedicosComponent, pathMatch: 'full'},
  { path: 'personalista', component: PersonaListaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
