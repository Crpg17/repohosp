//importamos OnInit
import { Component, OnInit } from '@angular/core';
//importamos HttpClient
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
//importamo el modal
import { DefaultModalComponent} from '../DefaultsComponents/default-modal/default-modal.component';

//creamos la interface
export interface Persona {
  id?: string;
  nombre: string;
  ap_paterno: string;
  ap_materno: string;
}

@Component({
  selector: 'app-persona-lista',
  templateUrl: './persona-lista.component.html',
  styleUrls: ['./persona-lista.component.scss'],
})

export class PersonaListaComponent implements OnInit {
  // Propiedad para almacenar los datos de las personas
  personas: any[] = [];

  //creamos un constructor
  //private dialog: MatDialog
  constructor(private http: HttpClient, private dialog: MatDialog) {}

  //con el OnInit hacemos el get de la api
  ngOnInit() {
    this.http
      .get('http://127.0.0.1:8000/api/v1.0/personas')
      .subscribe((data: any) => {
        this.personas = data.data;
        console.log(data);
      });
  }

  //Creamos la funcion crear 
  openCreateModal() {
    const dialogRef = this.dialog.open(DefaultModalComponent, {
      data: { action: 'create' },
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Se ha guardado una nueva persona, realiza las acciones necesarias, como enviar una solicitud HTTP para guardarla en el servidor
        const nuevaPersona: Persona = {
          //nombres de la base de datos
          nombre: result.nombre,
          ap_paterno: result.ap_paterno,
          ap_materno: result.ap_materno
        };
  
        // Envía la solicitud HTTP para guardar la nueva persona
        this.http.post('http://127.0.0.1:8000/api/v1.0/persona/create', nuevaPersona)
          .subscribe((response: any) => {
            // Actualiza la lista de personas con la respuesta del servidor
            this.personas.push(response.data);
          });
      }
    });
  }
  
  
  //creamos la funcion para abrir el modal
  openEditModal(persona: Persona) {
    const dialogRef = this.dialog.open(DefaultModalComponent, {
      data: {
        action: 'edit',
        nombre: persona.nombre,
        ap_paterno: persona.ap_paterno,
        ap_materno: persona.ap_materno
      },
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Se ha guardado la edición de la persona, realiza las acciones necesarias, como enviar una solicitud HTTP para actualizarla en el servidor
        const personaEditada: Persona = {
          //nombres de la base de datos
          nombre: result.nombre,
          ap_paterno: result.ap_paterno,
          ap_materno: result.ap_materno
        };
  
        // Envía la solicitud HTTP para actualizar la persona en la ruta correspondiente (por ejemplo, 'http://127.0.0.1:8000/api/v1.0/persona/123')
        this.http.put(`http://127.0.0.1:8000/api/v1.0/persona/update/${persona.id}`, personaEditada)
          .subscribe((response: any) => {
            // Actualiza la lista de personas con la respuesta del servidor
            const personaActualizada = response.data;
            const index = this.personas.findIndex(p => p.id === personaActualizada.id);
            if (index !== -1) {
              this.personas[index] = personaActualizada;
            }
          });
      }
    });
  }

  //creamos la funcion para eliminar la persona
  deletePersona(persona: Persona) {
    this.http.delete(`http://127.0.0.1:8000/api/v1.0/persona/delete/${persona.id}`)
      .subscribe(() => {
        // Elimina la persona de la lista local
        this.personas = this.personas.filter(p => p.id !== persona.id);
      });
  }
  
  
  
}
