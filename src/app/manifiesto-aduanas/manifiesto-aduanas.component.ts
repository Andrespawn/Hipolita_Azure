import { Component, OnInit } from '@angular/core';
import { AduanasService } from './AduanasServices';
import { DownloadFile } from '../Services/DownloadFile';

import { NgxSpinnerService } from 'ngx-spinner';

import { ConfigService } from '../ReadConfig/read-config';

@Component({
  selector: 'app-manifiesto-aduanas',
  templateUrl: './manifiesto-aduanas.component.html',
  styleUrls: ['./manifiesto-aduanas.component.css']
})
export class ManifiestoAduanasComponent implements OnInit {

  msjValidacion: String = '';
  msjErrorService: String = '';

  mostarMsjValidacion: Boolean = false;
  mostarMsjErrorService: Boolean = false;

  urlDownload: any;
  urlFTP: any;

  constructor(private aduanaService: AduanasService, private downloadFile: DownloadFile, private spinner: NgxSpinnerService, private configService: ConfigService) {

  }

  ngOnInit() {
  }

  generarDocAduanas(event) {
    event.preventDefault();

    const target = event.target;
    const nroGuia: string = target.querySelector('#txtNroGuia').value;

    if (this.validarCampos(nroGuia)) {

      this.spinner.show();

      this.urlDownload = this.configService.loadJSON('./assets/config.json')['URL_ADUANAS_DOWNLOAD'];
      this.urlFTP = this.configService.loadJSON('./assets/config.json')['URL_ADUANAS_FTP'];

      this.aduanaService.getData(nroGuia).subscribe(data => {

        const url: string = this.urlDownload + '"' + this.urlFTP + data.archivoGenerado + '"';

        this.downloadFile.getFileDownload(url, 'xml');

        /***********funciona pdf) *****
          this.getPDF(url).subscribe((response) => {
          const file = new Blob([response], { type: 'application/pdf' });
          const fileURL = URL.createObjectURL(file);
          window.open(fileURL); } );
        **********funciona pdf) ******/

        this.spinner.hide();
        this.msjErrorService = null;
        this.mostarMsjErrorService = false;

      },
        error => {
          this.spinner.hide();
          this.mostarMsjErrorService = true;
          this.msjErrorService = "" + error.message;
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
