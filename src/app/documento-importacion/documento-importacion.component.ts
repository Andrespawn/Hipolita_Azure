import { Component, OnInit, Injectable } from '@angular/core';
import { DocumentService } from './document.service';
import { DownloadFile } from '../Services/DownloadFile';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfigService } from '../ReadConfig/read-config';
import { Messages} from '../Library/Messages';

@Injectable()

@Component({
  selector: 'app-documento-importacion',
  templateUrl: './documento-importacion.component.html',
  styleUrls: ['./documento-importacion.component.css']
})
export class DocumentoImportacionComponent extends Messages {

  private esbErrorCodes : string = this.configService.loadJSON('./assets/config.js')['ESB_ERROR_STATUS'];
  private esbCompleteWithErrorCodes : string = this.configService.loadJSON('./assets/config.js')['ESB_COMPLETE_WITH_ERROR_STATUS'];

  private urlDownload: any;
  private urlFTP: any;

  constructor(private downloadFile: DownloadFile, private documentService: DocumentService, private spinner: NgxSpinnerService, private configService: ConfigService) {
    super();
  }

  buscarRuta(event) {
    event.preventDefault();

    this.mostrarMensajeValidacionForm = false;
    const target = event.target;

    const fechadoc: Date = target.querySelector('#txtDate').value;
    const nroGuia = target.querySelector('#nroGuiaAlert').value;
    const nroDocImport = target.querySelector('#nroDocImport').value;

    if (this.validarCampos(nroDocImport, nroGuia, fechadoc)) {

      this.spinner.show();

      this.urlDownload = this.configService.loadJSON('./assets/config.js')['URL_DOC_IMPORTACION_DOWNLOAD'];
      this.urlFTP = this.configService.loadJSON('./assets/config.js')['URL_DOC_IMPORTACION_FTP'];

      this.documentService.getData(nroDocImport, nroGuia, fechadoc).subscribe(data => {
        console.log(data);
        if (data !== null) {
          if(data.headers.get('SCodigo') != null && this.esbErrorCodes.includes(data.headers.get('SCodigo'))){
            this.showErrorMessageSearchDocumentPath(true,data.headers.get('SCodigo')  + ' - ' + data.headers.get('SMensaje'),false,'');
            this.spinner.hide();
            return;
          }
  
          if(data.headers.get('SCodigo') != null && this.esbCompleteWithErrorCodes.includes(data.headers.get('SCodigo'))){
            this.showErrorMessageSearchDocumentPath(false,'',true,data.headers.get('SCodigo')  + ' - ' + data.headers.get('SMensaje'));
            this.spinner.hide();
            return;
          }

          const url: string = this.urlDownload + '"' + this.urlFTP + data.body.fileName + '"';
          console.log('*****DOWNLOAD URL***** ', url);

          this.downloadFile.getFileDownload(url, 'pdf');
          this.showErrorMessageSearchDocumentPath(false,'',false,'');
        }
        else {
          this.showErrorMessageSearchDocumentPath(false,'',true,'No se encontro archivo con los valores proporcionados.');
        }
        this.spinner.hide();
      },
        error => {
          var errorMessage = error.headers.get('SCodigo') == null ? error.status + ' - ' : error.headers.get('SCodigo')  + ' - ';
          errorMessage += error.headers.get('SMensaje') == null ? error.statusText : error.headers.get('SMensaje');
          this.showErrorMessageSearchDocumentPath(true,errorMessage,false,'');
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
