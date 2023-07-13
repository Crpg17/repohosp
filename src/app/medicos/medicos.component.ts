import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ModalMComponent } from '../modal-m/modal-m.component';


export interface Medico {
  id?: string;
  nombre: string;
  especialidad: string;

}

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.scss']
})

export class MedicosComponent implements OnInit {
  // Propiedad para almacenar los datos de las personas
  Medicos: any[] = [];

  //creamos un constructor
  //private dialog: MatDialog
  constructor(private http: HttpClient, private dialog: MatDialog) {}

  //con el OnInit hacemos el get de la api
  ngOnInit() {
    this.http
      .get('http://127.0.0.1:8000/api/medicos')
      .subscribe((data: any) => {
        this.Medicos = data.data;
        console.log(data);
      });
  }

  //Creamos la funcion crear 
  openCreateModal() {
    const dialogRef = this.dialog.open(ModalMComponent, {
      data: { action: 'create' },
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Se ha guardado una nueva persona, realiza las acciones necesarias, como enviar una solicitud HTTP para guardarla en el servidor
        const nuevoMedico: Medico = {
          //nombres de la base de datos
          nombre: result.nombre,
          especialidad: result.especialidad,
          

        };
  
        // Envía la solicitud HTTP para guardar la nueva persona
        this.http.post('http://127.0.0.1:8000/api/medicos/create', nuevoMedico)
          .subscribe((response: any) => {
            // Actualiza la lista de personas con la respuesta del servidor
            this.Medicos.push(response.data);
          });
      }
    });
  }
  
  
  //creamos la funcion para abrir el modal
  openEditModal(medico: Medico) {
    const dialogRef = this.dialog.open(ModalMComponent, {
      data: {
        action: 'edit',
        nombre: medico.nombre,
        especialidad: medico.especialidad,
      
      },
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Se ha guardado la edición de la persona, realiza las acciones necesarias, como enviar una solicitud HTTP para actualizarla en el servidor
        const medicoEditado: Medico = {
          //nombres de la base de datos
          nombre: result.nombre,
          especialidad: result.especialidad,
        };
  
        // Envía la solicitud HTTP para actualizar la persona en la ruta correspondiente (por ejemplo, 'http://127.0.0.1:8000/api/v1.0/persona/123')
        this.http.put(`http://127.0.0.1:8000/api/medicos/update/${medico.id}`, medicoEditado)
          .subscribe((response: any) => {
            // Actualiza la lista de personas con la respuesta del servidor
            const medicosActualizados = response.data;
            const index = this.Medicos.findIndex(p => p.id === medicosActualizados.id);
            if (index !== -1) {
              this.Medicos[index] = medicosActualizados;
            }
          });
      }
    });
  }

  //creamos la funcion para eliminar la persona
  deleteMedico(medico: Medico) {
    this.http.delete(`http://127.0.0.1:8000/api/medico/delete/${medico.id}`)
      .subscribe(() => {
        // Elimina la persona de la lista local
        this.Medicos = this.Medicos.filter(p => p.id !== medico.id);
      });
  }
  
  
  
}


