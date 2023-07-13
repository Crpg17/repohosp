import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
//importamo el modal
import { DefaultModalComponent} from '../DefaultsComponents/default-modal/default-modal.component';

export interface Hospital {
  id?: string;
  nombre: string;
  direccion: string;
  ciudad: string;
  pais: string;
  telefono: string;
}

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.scss']
})

export class HospitalesComponent implements OnInit {
  // Propiedad para almacenar los datos de las personas
  Hospitales: any[] = [];

  //creamos un constructor
  //private dialog: MatDialog
  constructor(private http: HttpClient, private dialog: MatDialog) {}

  //con el OnInit hacemos el get de la api
  ngOnInit() {
    this.http
      .get('http://127.0.0.1:8000/api/hospitales')
      .subscribe((data: any) => {
        this.Hospitales = data.data;
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
        const nuevoHospital: Hospital = {
          //nombres de la base de datos
          nombre: result.nombre,
          direccion: result.direccion,
          ciudad: result.ciudad,
          pais: result.pais,
          telefono: result.telefono

        };
  
        // Envía la solicitud HTTP para guardar la nueva persona
        this.http.post('http://127.0.0.1:8000/api/hospital/create', nuevoHospital)
          .subscribe((response: any) => {
            // Actualiza la lista de personas con la respuesta del servidor
            this.Hospitales.push(response.data);
          });
      }
    });
  }
  
  
  //creamos la funcion para abrir el modal
  openEditModal(hospital: Hospital) {
    const dialogRef = this.dialog.open(DefaultModalComponent, {
      data: {
        action: 'edit',
        nombre: hospital.nombre,
        direccion: hospital.direccion,
        ciudad: hospital.ciudad,
        pais: hospital.pais,
        telefono: hospital.telefono
      },
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Se ha guardado la edición de la persona, realiza las acciones necesarias, como enviar una solicitud HTTP para actualizarla en el servidor
        const hospitalEditado: Hospital = {
          //nombres de la base de datos
          nombre: result.nombre,
          direccion: result.direccion,
          ciudad: result.ciudad,
          pais: result.pais,
          telefono: result.telefono
        };
  
        // Envía la solicitud HTTP para actualizar la persona en la ruta correspondiente (por ejemplo, 'http://127.0.0.1:8000/api/v1.0/persona/123')
        this.http.put(`http://127.0.0.1:8000/api/hospital/update/${hospital.id}`, hospitalEditado)
          .subscribe((response: any) => {
            // Actualiza la lista de personas con la respuesta del servidor
            const hospitalesActualizados = response.data;
            const index = this.Hospitales.findIndex(p => p.id === hospitalesActualizados.id);
            if (index !== -1) {
              this.Hospitales[index] = hospitalesActualizados;
            }
          });
      }
    });
  }

  //creamos la funcion para eliminar la persona
  deleteHospital(hospital: Hospital) {
    this.http.delete(`http://127.0.0.1:8000/api/hospital/delete/${hospital.id}`)
      .subscribe(() => {
        // Elimina la persona de la lista local
        this.Hospitales = this.Hospitales.filter(p => p.id !== hospital.id);
      });
  }
  
  
  
}

