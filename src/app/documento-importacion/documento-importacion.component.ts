import { Component, OnInit, Injectable } from '@angular/core';
import { DocumentService } from './document.service';
import { DownloadFile } from '../Services/DownloadFile';
import { error } from '@angular/compiler/src/util';
import { SPath } from '../Services/sPath';
import { isError } from 'util';
import { ifError } from 'assert';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';

import { ConfigService } from '../ReadConfig/read-config';
import { Response } from '@angular/http';

@Injectable()

@Component({
  selector: 'app-documento-importacion',
  templateUrl: './documento-importacion.component.html',
  styleUrls: ['./documento-importacion.component.css']
})
export class DocumentoImportacionComponent implements OnInit {

  mostrarMensajeValidacionForm: Boolean = false;
  mostrarMensajeErrorService: Boolean = false;
  mostrarMensajeFileVoid: Boolean = false;
  mensajeAlertaValidacionForm: String = '';
  mensajeAlertaErrorService: String = '';
  mensajeAlertaFileVoid: String = '';

  urlDownload: any;
  urlFTP: any;

  constructor(private downloadFile: DownloadFile, private documentService: DocumentService, private httpClient: HttpClient, private spinner: NgxSpinnerService, private configService: ConfigService) {

  }

  ngOnInit() {
  }

  buscarRuta(event) {
    event.preventDefault();

    this.mostrarMensajeValidacionForm = false;
    const target = event.target;

    const fechadoc: Date = target.querySelector('#txtDate').value;
    const nroGuia = target.querySelector('#nroGuiaAlert').value;
    const nroDocImport = target.querySelector('#nroDocImport').value;

    const validarForm = this.validarCampos(nroDocImport, nroGuia, fechadoc);

    if (validarForm) {

      this.spinner.show();


      this.urlDownload = this.configService.loadJSON('./assets/config.js')['URL_DOC_IMPORTACION_DOWNLOAD'];
      this.urlFTP = this.configService.loadJSON('./assets/config.js')['URL_DOC_IMPORTACION_FTP'];

      this.documentService.getData(nroDocImport, nroGuia, fechadoc).subscribe(data => {
        if (data !== null) {


          const url: string = this.urlDownload + '"' + this.urlFTP + data.fileName + '"';
          console.log('*****DOWNLOAD URL***** ', url);

          this.downloadFile.getFileDownload(url, 'pdf');

          /* **********funciona pdf) *****
            this.getPDF(url).subscribe((response) => {
            const file = new Blob([response], { type: 'application/pdf' });
            const fileURL = URL.createObjectURL(file);
            window.open(fileURL); } );
          // **********funciona pdf) ******/

          this.mostrarMensajeErrorService = false;
          this.mensajeAlertaErrorService = null;
          this.mostrarMensajeFileVoid = false;
          this.mensajeAlertaFileVoid = '';
          this.spinner.hide();
        }
        else {
          this.mostrarMensajeFileVoid = true;
          this.mensajeAlertaFileVoid = 'No se encontro archivo con los valores proporcionados.';
          this.spinner.hide();
        }

      },
        error => {
          this.mostrarMensajeErrorService = true;
          this.mensajeAlertaErrorService = '' + error.message;
          this.mostrarMensajeFileVoid = false;
          this.mensajeAlertaFileVoid = '';
          this.spinner.hide();

        }

      );
    }
  }

  validarCampos(NroImportacion, nroG, fecfecha) {
    this.mensajeAlertaValidacionForm = '';
    if (NroImportacion === '' && fecfecha === '' && nroG === '') {
      this.mensajeAlertaValidacionForm = 'Debe diligenciar la fecha de ingreso, número guía alertan y número documento importación. ';
      this.mostrarMensajeValidacionForm = true;
      return false;
    } else if (NroImportacion !== '' && fecfecha === '' && nroG === '') {
      this.mensajeAlertaValidacionForm = 'Debe diligenciar la fecha de ingreso y número guía alertan . ';
      this.mostrarMensajeValidacionForm = true;
      return false;
    } else if (NroImportacion === '' && fecfecha !== '' && nroG === '') {
      this.mensajeAlertaValidacionForm = 'Debe diligenciar el número guía alertan y número documento importación. ';
      this.mostrarMensajeValidacionForm = true;
      return false;
    } else if (NroImportacion === '' && fecfecha === '' && nroG !== '') {
      this.mensajeAlertaValidacionForm = 'Debe diligenciar la fecha de ingreso y número documento importación. ';
      this.mostrarMensajeValidacionForm = true;
      return false;
    } else if (NroImportacion !== '' && fecfecha === '' && nroG !== '') {
      this.mensajeAlertaValidacionForm = 'Debe diligenciar la fecha de ingreso. ';
      this.mostrarMensajeValidacionForm = true;
      return false;
    } else if (NroImportacion === '' && fecfecha !== '' && nroG !== '') {
      this.mensajeAlertaValidacionForm = 'Debe diligenciar el número documento importación. ';
      this.mostrarMensajeValidacionForm = true;
      return false;
    } else if (NroImportacion !== '' && fecfecha !== '' && nroG === '') {
      this.mensajeAlertaValidacionForm = 'Debe diligenciar el número guía alertan. ';
      this.mostrarMensajeValidacionForm = true;
      return false;
    } else {
      this.mostrarMensajeValidacionForm = false;
      return true;
    }
  }


}
