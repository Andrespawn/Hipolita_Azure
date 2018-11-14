import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { FacturacionService } from './FacturacionService';
import { DownloadFile } from '../Services/DownloadFile';

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

  constructor(private spinner: NgxSpinnerService, private facturacionService: FacturacionService, private downloadFile: DownloadFile) {
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
      this.spinner.show();
      this.facturacionService.getData( fechaFactura_ini, fechaFactura_fin, this.tipoFactura).subscribe( data => {
        console.log('Finish 1' + data);
        console.log('/ftp/HIPOLITA/DEV/Facturacion/' + data.fileName);
        const url: string = 'https://azwappfronthipodev.azaseusedev.avtest.online/api/ServicesFiles/GetFile?pathRemoteFile=' +
          '"/ftp/HIPOLITA/DEV/Facturacion/' +
          data.fileName + '"';
        console.log(url);
        // this.httpClient.get(url).subscribe();
        // window.open(url, '_blank', '');
        this.downloadFile.getFileDownload(url, 'pdf');

        this.spinner.hide();
      },
      error => {
        console.log('Finish 2');
        this.spinner.hide();
      }
      );
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
