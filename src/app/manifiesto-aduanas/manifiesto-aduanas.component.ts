import { Component } from '@angular/core';
import { AduanasService } from './AduanasServices';
import { DownloadFile } from '../Services/DownloadFile';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfigService } from '../ReadConfig/read-config';
import { Messages} from '../Library/Messages';

@Component({
  selector: 'app-manifiesto-aduanas',
  templateUrl: './manifiesto-aduanas.component.html',
  styleUrls: ['./manifiesto-aduanas.component.css']
})
export class ManifiestoAduanasComponent extends Messages {

  private esbErrorCodes : string = this.configService.loadJSON('./assets/config.js')['ESB_ERROR_STATUS'];
  private esbCompleteWithErrorCodes : string = this.configService.loadJSON('./assets/config.js')['ESB_COMPLETE_WITH_ERROR_STATUS'];
  private urlDownload: any;
  private urlFTP: any;

  constructor(private aduanaService: AduanasService, private downloadFile: DownloadFile, private spinner: NgxSpinnerService, private configService: ConfigService) {
    super();
  }

  generarDocAduanas(event) {
    event.preventDefault();

    const target = event.target;
    const nroGuia: string = target.querySelector('#txtNroGuia').value;

    if (this.validarCampos(nroGuia)) {

      this.spinner.show();

      this.urlDownload = this.configService.loadJSON('./assets/config.js')['URL_ADUANAS_DOWNLOAD'];
      this.urlFTP = this.configService.loadJSON('./assets/config.js')['URL_ADUANAS_FTP'];

      this.aduanaService.getData(nroGuia).subscribe(data => {

        if(data.headers.get('SCodigo') != null && this.esbErrorCodes.includes(data.headers.get('SCodigo'))){
          this.mostarMsjErrorService = true;
          this.msjErrorService = data.headers.get('SCodigo')  + ' - ' + data.headers.get('SMensaje');
          this.spinner.hide();
          return;
        }

        if(data.headers.get('SCodigo') != null && this.esbCompleteWithErrorCodes.includes(data.headers.get('SCodigo'))){
          this.mostarMsjErrorService = true;
          this.msjErrorService = data.headers.get('SCodigo')  + ' - ' + data.headers.get('SMensaje');
          this.spinner.hide();
          return;
        }

        const url: string = this.urlDownload + '"' + this.urlFTP + data.body.archivoGenerado + '"';
        this.downloadFile.getFileDownload(url, 'xml');
        this.spinner.hide();
        this.msjErrorService = null;
        this.mostarMsjErrorService = false;

      },
        error => {
          var errorMessage = error.headers.get('SCodigo') == null ? error.status + ' - ' : error.headers.get('SCodigo')  + ' - ';
          errorMessage += error.headers.get('SMensaje') == null ? error.statusText : error.headers.get('SMensaje');
          this.spinner.hide();
          this.mostarMsjErrorService = true;
          this.msjErrorService = errorMessage;
        }
      );
    }
  }

  validarCampos(nroGuia) {
    if (nroGuia === '') {
      this.msjValidacion = 'Debe diligenciar el campo Número Guía Master.';
      this.mostarMsjValidacion = true;
      return false;
    } else {
      this.msjValidacion = '';
      this.mostarMsjValidacion = false;
      return true;
    }
  }

}
