import { Component, OnInit } from '@angular/core';
import { AduanasService } from './AduanasServices';
import {DownloadFile} from '../Services/DownloadFile';

@Component({
  selector: 'app-manifiesto-aduanas',
  templateUrl: './manifiesto-aduanas.component.html',
  styleUrls: ['./manifiesto-aduanas.component.css']
})
export class ManifiestoAduanasComponent implements OnInit {

msjValidacion: String = '';
mostarMsjValidacion: Boolean = false;

  constructor( private aduanaService: AduanasService, private downloadFile: DownloadFile) { }

  ngOnInit() {
  }

  generarDocAduanas(event) {
    event.preventDefault();

    const target = event.target;
    const nroGuia: string = target.querySelector('#txtNroGuia').value;
    if (this.validarCampos(nroGuia)) {
      this.aduanaService.getData( nroGuia ).subscribe( data => {
        console.log('/ftp/HIPOLITA/DEV/aduanas/' + data.archivoGenerado);
        // const url: string = 'https://azrav-webapp-tst28.azurewebsites.net/api/ServicesFiles/GetFile?pathRemoteFile=' +
        // const url: string = 'http://localhost/Hipolitasitio/api/ServicesFiles/GetFile?pathRemoteFile=' +
        const url: string = 'https://azwappfronthipodev.azaseusedev.avtest.online/api/ServicesFiles/GetFile?pathRemoteFile=' +
        '"/ftp/HIPOLITA/DEV/aduanas/' +
         data.archivoGenerado + '"';
         console.log(url);
        // this.httpClient.get(url).subscribe();
        // window.open(url, '_blank', '');
        this.downloadFile.getFileDownload(url, 'xml');
        /* **********funciona pdf) *****
          this.getPDF(url).subscribe((response) => {
          const file = new Blob([response], { type: 'application/pdf' });
          const fileURL = URL.createObjectURL(file);
          window.open(fileURL); } );
        // **********funciona pdf) ******/
      },
      error => {
        console.log('error', error);
      });
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
