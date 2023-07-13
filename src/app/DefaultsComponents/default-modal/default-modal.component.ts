//importamos Inject
import { Component, Inject } from '@angular/core';
//importamos MAT_DIALOG_DATA, MatDialogRef
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-default-modal',
  templateUrl: './default-modal.component.html',
  styleUrls: ['./default-modal.component.scss']
})

export class DefaultModalComponent {
  //creamos un consttructor
  constructor(
    public dialogRef: MatDialogRef<DefaultModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  
  //funcion para guardar
  onSave() {
    // Devuelve los datos ingresados en el formulario
    this.dialogRef.close({
      nombre: this.data.nombre,
      direccion: this.data.direccion,
      ciudad: this.data.ciudad,
      pais: this.data.pais,
      telefono: this.data.telefono
    
    });
  }
  
}
