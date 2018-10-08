import { Component, OnInit } from '@angular/core';
import { DocumentService } from './document.service';
import { error } from '@angular/compiler/src/util';
import { SPath } from './sPath';
import { isError } from 'util';
import { ifError } from 'assert';
import { HttpClient } from '@angular/common/http';


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

  constructor(private documentService: DocumentService, private httpClient: HttpClient) {
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
      this.documentService.getData(nroDocImport, nroGuia, fechadoc).subscribe(
        data => {
          console.log('/ftp/HIPOLITA/DEV/Invoice/DocImport/' + data.fileName);
          const url: string = 'http://localhost/Hipolitasitio/api/ServicesFiles/GetFile?pathRemoteFile=' +
          '"/ftp/HIPOLITA/DEV/Invoice/DocImport/' +
          'importacion-2018-10-05-174844.pdf"';
          // data.fileName + '"';
          // this.httpClient.get(url).subscribe();
          window.open(url, '_blank', '');
        },
        error => {
          console.log('error', error);
        });
    }
  }

  validarCampos(NroImportacion, nroG, fecfecha, ) {
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
