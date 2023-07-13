import { Component, Inject } from '@angular/core';
//importamos MAT_DIALOG_DATA, MatDialogRef
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-m',
  templateUrl: './modal-m.component.html',
  styleUrls: ['./modal-m.component.scss']
})

export class ModalMComponent {
  //creamos un consttructor
  constructor(
    public dialogRef: MatDialogRef<ModalMComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  
  //funcion para guardar
  onSave() {
    // Devuelve los datos ingresados en el formulario
    this.dialogRef.close({
      nombre: this.data.nombre,
      especialidad: this.data.especialidad,
    
    });
  }
  
}