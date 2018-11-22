import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DiscrepanciaServices } from './DiscrepanciaServices';
import { DownloadFile } from '../Services/DownloadFile';
import { NgxSpinnerService } from 'ngx-spinner';

import { ConfigService } from '../ReadConfig/read-config';

@Component({
  selector: 'app-reporte-discrepancias',
  templateUrl: './reporte-discrepancias.component.html',
  styleUrls: ['./reporte-discrepancias.component.css']
})
export class ReporteDiscrepanciasComponent implements OnInit {

  urlDownload: any;
  urlFTP: any;

  constructor(private discrepanciaservices: DiscrepanciaServices, private downloadFile: DownloadFile, private spinner: NgxSpinnerService, private configService: ConfigService) { 
    
  }

  mensajeValidacion: String = '';
  mensajeErrorService: String = '';

  mostrarMensajeValidacion: Boolean = false;
  mostrarMensajeErrorService: Boolean = false;

  ngOnInit() {
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
        const url: string = this.urlDownload + '"' + this.urlFTP + data.nombreArchivo + '"';

        this.downloadFile.getFileDownload(url, 'csv');
        this.spinner.hide();
      },
        error => {
          console.log('error', error);
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

  /*consumirServicio(fechaInicio, fechaFin) {


    const headers = new HttpHeaders({
      'Ocp-Apim-Subscription-Key': '5a14178462d24ca39fc93398ee444a91',
      'Ocp-Apim-Trace': 'true',
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json',
      'SUsuario': 's',
      'SOrigenCliente': 'a',
      'Scanal': 'w',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
    });


    const body: String = '{"Query": { "Date_start":"' + fechaInicio + '", "Date_end":"' + fechaFin + '" } }';

    return this.httpClient.post('https://avapimgmtexpqa.azure-api.net/discrepancia/reporteDiscrepancia', body, { headers }).subscribe(
      data => {
        console.log(data);
      },
      error => {
        this.mostrarMensajeErrorService = true;
        this.mensajeErrorService = error.message;
      }
    );

  }*/
}
