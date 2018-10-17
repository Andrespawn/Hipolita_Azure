import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-impresion-etiqueta',
  templateUrl: './impresion-etiqueta.component.html',
  styleUrls: ['./impresion-etiqueta.component.css']
})
export class ImpresionEtiquetaComponent implements OnInit {

  mostrarMsgValidaciones: boolean = false;
  mensajeValidacuines: string = "";

  constructor() { }

  ngOnInit() {
  }

  generar(event) {
    event.preventDefault();

    const target = event.target;
    const opcion: any = target.querySelector('#cmbOpcion').value;
    const nroGuia: any = target.querySelector('#txtNroGuia').value;

    if (nroGuia == "" && opcion == "void") {
      this.mostrarMsgValidaciones = true;
      this.mensajeValidacuines = "Debe diligenciar número de guía y seleccionar una opción.";
    } else if (nroGuia == "") {
      this.mostrarMsgValidaciones = true;
      this.mensajeValidacuines = "Debe diligenciar el número de guía.";
    } else if (opcion == "void") {
      this.mostrarMsgValidaciones = true;
      this.mensajeValidacuines = "Debe seleccionar una opción.";
    }else{
      this.mostrarMsgValidaciones = false;
      this.mensajeValidacuines = "";
    }


  }

}
