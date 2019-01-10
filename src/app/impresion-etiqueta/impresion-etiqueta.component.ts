import { Component } from '@angular/core';
import { DownloadFile } from '../Services/DownloadFile';
import { NgxSpinnerService } from 'ngx-spinner';
import { Messages} from '../Library/Messages';
import { ConfigService } from '../ReadConfig/read-config';

@Component({
  selector: 'app-impresion-etiqueta',
  templateUrl: './impresion-etiqueta.component.html',
  styleUrls: ['./impresion-etiqueta.component.css']
})
export class ImpresionEtiquetaComponent extends Messages{

  private urlModal: any;
  private esbErrorCodes : string = this.configService.loadJSON('./assets/config.js')['ESB_ERROR_STATUS'];
  private esbCompleteWithErrorCodes : string = this.configService.loadJSON('./assets/config.js')['ESB_COMPLETE_WITH_ERROR_STATUS'];

  constructor(private downloadFile: DownloadFile, private spinner: NgxSpinnerService, private configService: ConfigService) {
    super();
  }

  generar(event) {
    event.preventDefault();
    this.spinner.show();
    const target = event.target;
    const opcion: any = target.querySelector('#cmbOpcion').value;
    const nroGuia: any = target.querySelector('#txtNroGuia').value;

    this.mostrarMsgDescarga = false;
    this.mostrarMsgValidaciones = false
    this.mostrarMsgError = false;
    this.mensajeDescarga = "";
    this.mensajeValidacuines = "";
    this.mensajeError = '';

    if (nroGuia === '' && opcion === 'void') {
      this.mostrarMsgValidaciones = true;
      this.mensajeValidacuines = 'Debe diligenciar número de guía y seleccionar una opción.';
      this.spinner.hide();
      return;
    } else if (nroGuia === '') {
      this.mostrarMsgValidaciones = true;
      this.mensajeValidacuines = 'Debe diligenciar el número de guía.';
      this.spinner.hide();
      return;
    } else if (opcion === 'void') {
      this.mostrarMsgValidaciones = true;
      this.mensajeValidacuines = 'Debe seleccionar una opción.';
      this.spinner.hide();
      return;
    } else {
      this.mostrarMsgValidaciones = false;
      this.mensajeValidacuines = '';
    }

    this.urlModal = this.configService.loadJSON('./assets/config.js')['URL_IMP_ETIQUETA_MODAL'];

    const url: string = this.urlModal + nroGuia + '&tipo=' + opcion;
    console.log('*****DOWNLOAD URL***** ', url);

    this.getFileDownload(url, 'pdf');
    console.log('*****DOWNLOAD***** ');
    this.spinner.hide();
  }


  getFileDownload(url, typeFileName) {
    this.downloadFile.getFile(url).subscribe((response) => {

      const file = new Blob([response], { type: 'application/' + typeFileName });
      if (file.size > 0) {
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      } else {
        this.mostrarMsgDescarga = true;
        this.mensajeDescarga = "No se encontro ningun archivo.";
      }
    },
      error => {
        this.mostrarMsgError=true;
        this.mensajeError=error.message;
        
      });
  }

}
