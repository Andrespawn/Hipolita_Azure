import { Component } from '@angular/core';
import { DiscrepanciaServices } from './DiscrepanciaServices';
import { DownloadFile } from '../Services/DownloadFile';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfigService } from '../ReadConfig/read-config';
import { Messages} from '../Library/Messages';

@Component({
  selector: 'app-reporte-discrepancias',
  templateUrl: './reporte-discrepancias.component.html',
  styleUrls: ['./reporte-discrepancias.component.css']
})
export class ReporteDiscrepanciasComponent extends Messages {

  private esbErrorCodes : string = this.configService.loadJSON('./assets/config.js')['ESB_ERROR_STATUS'];
  private esbCompleteWithErrorCodes : string = this.configService.loadJSON('./assets/config.js')['ESB_COMPLETE_WITH_ERROR_STATUS'];
  private urlDownload: any;
  private urlFTP: any;

  constructor(private discrepanciaservices: DiscrepanciaServices, private downloadFile: DownloadFile, private spinner: NgxSpinnerService, private configService: ConfigService) { 
    super();
  }

  generarReporte(event) {

    event.preventDefault();
    const target = event.target;

    const fechIni: Date = target.querySelector('#txtFechIni').value;
    const fechFin: Date = target.querySelector('#txtFechFin').value;

    const validacionForm = this.validarCampos(fechIni, fechFin);

    if (validacionForm) {
      this.spinner.show();

      this.urlDownload = this.configService.loadJSON('./assets/config.js')['URL_REPO_DISCREPANCIAS_DOWNLOAD'];
      this.urlFTP = this.configService.loadJSON('./assets/config.js')['URL_REPO_DISCREPANCIAS_FTP'];

      this.discrepanciaservices.getData(fechIni, fechFin).subscribe(data => {
        const url: string = this.urlDownload + '"' + this.urlFTP + data.body.nombreArchivo + '"';
        console.log('*****DOWNLOAD URL***** ',url);

        this.downloadFile.getDownloadCSV(url, data.body.nombreArchivo);
        this.spinner.hide();
      },
        error => {
          this.spinner.hide();
        });

    }
  }

  validarCampos(fechaInicio, fechaFin) {

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
