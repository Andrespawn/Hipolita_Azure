import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { FacturacionService } from './FacturacionService';
import { DownloadFile } from '../Services/DownloadFile';
import { ConfigService } from '../ReadConfig/read-config';
import { Messages} from '../Library/Messages';

@Component({
  selector: 'app-facturacion',
  templateUrl: './facturacion.component.html',
  styleUrls: ['./facturacion.component.css']
})
export class FacturacionComponent extends Messages {
  private esbErrorCodes : string = this.configService.loadJSON('./assets/config.js')['ESB_ERROR_STATUS'];
  private esbCompleteWithErrorCodes : string = this.configService.loadJSON('./assets/config.js')['ESB_COMPLETE_WITH_ERROR_STATUS'];
  private selectedFactura: String = '';
  private facturaciones: any = ['Facturacion Flete', 'Facturacion impuestos'];
  private isChecked: Boolean = false;
  private tipoFactura: String;
  private urlDownload: any;
  private urlFTP: any;

  constructor(private spinner: NgxSpinnerService, private facturacionService: FacturacionService, private downloadFile: DownloadFile, private configService: ConfigService) {
    super();
  }
  radioCheked(event: any) {
    this.isChecked = true;
    this.selectedFactura = event.target.value;
    this.tipoFactura = this.selectedFactura;
  }

  facturar(event) {
    event.preventDefault();

    const target = event.target;
    const fechaFactura_ini: any = target.querySelector('#txtDateFactura_ini').value;
    const fechaFactura_fin: any = target.querySelector('#txtDateFactura_fin').value;
    if (this.validarCampos(fechaFactura_ini, fechaFactura_fin)) {
      this.spinner.show();

      this.urlDownload = this.configService.loadJSON('./assets/config.js')['URL_FACTURACION_DOWNLOAD'];
      this.urlFTP = this.configService.loadJSON('./assets/config.js')['URL_FACTURACION_FTP'];
            
      this.facturacionService.getData(fechaFactura_ini, fechaFactura_fin, this.tipoFactura).subscribe(data => {
        if(data.body === null){
          if(data.headers.get('SCodigo') != null && this.esbErrorCodes.includes(data.headers.get('SCodigo'))){
            this.mostrarMensajeValidacion = true;
            this.mensajeValidacion = data.headers.get('SCodigo')  + ' - ' + data.headers.get('SMensaje');
            this.spinner.hide();
            return;
          }
  
          if(data.headers.get('SCodigo') != null && this.esbCompleteWithErrorCodes.includes(data.headers.get('SCodigo'))){
            this.mostrarMensajeValidacion = true;
            this.mensajeValidacion = data.headers.get('SCodigo')  + ' - ' + data.headers.get('SMensaje');
            this.spinner.hide();
            return;
          }
          
        }else{
          console.log('entro')
          const url: string = this.urlDownload + '"' + this.urlFTP + data.body.fileName + '"';
          this.downloadFile.getFileDownload(url, 'pdf');
        }

        
        
        this.spinner.hide();
      },
        error => {

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
