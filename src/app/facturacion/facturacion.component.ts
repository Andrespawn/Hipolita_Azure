import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-facturacion',
  templateUrl: './facturacion.component.html',
  styleUrls: ['./facturacion.component.css']
})
export class FacturacionComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }

  selectedFactura: string = '';
  facturaciones: any = ['Facturacion Flete', 'Facturacion impuestos'];
  isChecked: boolean = false;
  tipoFactura: string;
  mostrarMsgValidaciones: boolean = false;
  mensajeValidacuines: string = "";


  radioCheked(event: any) {

    this.isChecked = true;
    this.selectedFactura = event.target.value;
    this.tipoFactura = this.selectedFactura;
    console.log(this.selectedFactura);

  }

  facturar(event) {
    event.preventDefault();

    const target = event.target;
    const fechaFactura: any = target.querySelector('#txtDateFactura').value;


    if (!this.isChecked && fechaFactura == "") {

      this.mostrarMsgValidaciones = true;
      this.mensajeValidacuines = "Debe seleccionar un tipo de factura y diligenciar la fecha de facturación.";
    } else {
      if (!this.isChecked) {
        this.mostrarMsgValidaciones = true;
        this.mensajeValidacuines = "Debe seleccionar un tipo de factura.";

      } else if (fechaFactura == "") {
        this.mostrarMsgValidaciones = true;
        this.mensajeValidacuines = "Debe diligenciar la fecha de facturación.";
      } else {
        this.mostrarMsgValidaciones = false;
        this.mensajeValidacuines = "";
      }
    }

  }



}
