import { Component, OnInit } from '@angular/core';
import { DocumentService } from './document.service';
import { DownloadFile } from '../Services/DownloadFile';
import { error } from '@angular/compiler/src/util';
import { SPath } from '../Services/sPath';
import { isError } from 'util';
import { ifError } from 'assert';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';

import { ConfigService } from '../ReadConfig/read-config';

@Component({
  selector: 'app-documento-importacion',
  templateUrl: './documento-importacion.component.html',
  styleUrls: ['./documento-importacion.component.css']
})
export class DocumentoImportacionComponent implements OnInit {

  mostrarMensajeValidacionForm: Boolean = false;
  mostrarMensajeErrorService: Boolean = false;
  mensajeAlertaValidacionForm: String = '';
  mensajeAlertaErrorService: String = '';

  urlDownload: any;
  urlFTP: any;

  constructor(private downloadFile: DownloadFile, private documentService: DocumentService, private httpClient: HttpClient, private spinner: NgxSpinnerService, private configService: ConfigService) {
    this.urlDownload = configService.loadJSON('./assets/config.json')['URL_DOC_IMPORTACION_DOWNLOAD'];
    this.urlFTP = configService.loadJSON('./assets/config.json')['URL_DOC_IMPORTACION_FTP'];
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
      
      this.documentService.getData(nroDocImport, nroGuia, fechadoc).subscribe(data => {

        const url: string = this.urlDownload + '"' + this.urlFTP + data.fileName + '"';
        this.downloadFile.getFileDownload(url, 'pdf');

        /* **********funciona pdf) *****
          this.getPDF(url).subscribe((response) => {
          const file = new Blob([response], { type: 'application/pdf' });
          const fileURL = URL.createObjectURL(file);
          window.open(fileURL); } );
        // **********funciona pdf) ******/

        this.mostrarMensajeErrorService = false;
        this.mensajeAlertaErrorService = null;
        this.spinner.hide();
      },
        error => {
          this.spinner.hide();
          this.mostrarMensajeErrorService = true;
          this.mensajeAlertaErrorService = '' + error.message;
          console.log('error', error.menssage());
          this.spinner.hide();
        }
      );
    }
  }

  /* getPDF(strurl) {
     // const url = `${this.serviceUrl}/pdf`;
     const httpOptions = {
       'responseType'  : 'arraybuffer' as 'json'
        // 'responseType'  : 'blob' as 'json'        //This also worked
     };
       return this.httpClient.get<any>(strurl , httpOptions);
     }*/


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
