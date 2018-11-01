import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-facturacion',
  templateUrl: './facturacion.component.html',
  styleUrls: ['./facturacion.component.css']
})
export class FacturacionComponent implements OnInit {
  selectedFactura: String = '';
  facturaciones: any = ['Facturacion Flete', 'Facturacion impuestos'];
  isChecked: Boolean = false;
  tipoFactura: String;
  mostrarMensajeValidacion: Boolean = false;
  mensajeValidacion: String = '';

  constructor() {
   }

  ngOnInit() {

  }




  radioCheked(event: any) {

    this.isChecked = true;
    this.selectedFactura = event.target.value;
    this.tipoFactura = this.selectedFactura;
    console.log(this.selectedFactura);

  }

  facturar(event) {
    event.preventDefault();

    const target = event.target;
    const fechaFactura_ini: any = target.querySelector('#txtDateFactura_ini').value;
    const fechaFactura_fin: any = target.querySelector('#txtDateFactura_fin').value;
    if (this.validarCampos(fechaFactura_ini, fechaFactura_fin)) {

    }

  }
  validarCampos(fechaInicio, fechaFin) {
    if (!this.isChecked) {
      this.mostrarMensajeValidacion = true;
      this.mensajeValidacion = 'Debe seleccionar un tipo de factura.';
      return false;
    }
    if (fechaInicio === '' && fechaFin === '') {

      this.mensajeValidacion = 'Debe diligenciar la fecha de inicio y la fecha fin';
      this.mostrarMensajeValidacion = true;
      return false;

    } else if (fechaInicio !== '' && fechaFin === '') {

      this.mensajeValidacion = 'Debe diligenciar la fecha fin';
      this.mostrarMensajeValidacion = true;
      return false;

    } else if (fechaInicio === '' && fechaFin !== '') {

      this.mensajeValidacion = 'Debe diligenciar la fecha inicio';
      this.mostrarMensajeValidacion = true;
      return false;

    } else {

      if (fechaInicio > fechaFin) {

        this.mensajeValidacion = 'La fecha inicio no debe ser mayor a la fecha fin.';
        this.mostrarMensajeValidacion = true;
        return false;

      } else {

        this.mensajeValidacion = '';
        this.mostrarMensajeValidacion = false;
        return true;

      }
    }


  }



}
