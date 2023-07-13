import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from "@angular/common/http";
import { PersonaListaComponent } from './persona-lista/persona-lista.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultModalComponent } from './DefaultsComponents/default-modal/default-modal.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { ModalMComponent } from './modal-m/modal-m.component';



@NgModule({
  declarations: [
    AppComponent,
    PersonaListaComponent,
    DefaultModalComponent,
    LoginComponent,
    HttpClientModule,
    RegisterComponent,
    HospitalesComponent,
    MedicosComponent,
    ModalMComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatDialogModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
