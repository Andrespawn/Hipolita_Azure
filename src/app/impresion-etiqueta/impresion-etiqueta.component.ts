import { Component, OnInit } from '@angular/core';
import { ImpresionService } from './ImpresionService';
import { DownloadFile } from '../Services/DownloadFile';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-impresion-etiqueta',
  templateUrl: './impresion-etiqueta.component.html',
  styleUrls: ['./impresion-etiqueta.component.css']
})
export class ImpresionEtiquetaComponent implements OnInit {

  mostrarMsgValidaciones: Boolean = false;
  mensajeValidacuines: String = '';

  constructor(private impresionService: ImpresionService, private downloadFile: DownloadFile , private httpClient: HttpClient ,  
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
  }

  generar(event) {
    event.preventDefault();
    this.spinner.show();
    const target = event.target;
    const opcion: any = target.querySelector('#cmbOpcion').value;
    const nroGuia: any = target.querySelector('#txtNroGuia').value;

    if (nroGuia === '' && opcion === 'void') {
      this.mostrarMsgValidaciones = true;
      this.mensajeValidacuines = 'Debe diligenciar número de guía y seleccionar una opción.';
    } else if (nroGuia === '') {
      this.mostrarMsgValidaciones = true;
      this.mensajeValidacuines = 'Debe diligenciar el número de guía.';
    } else if (opcion === 'void') {
      this.mostrarMsgValidaciones = true;
      this.mensajeValidacuines = 'Debe seleccionar una opción.';
    } else {
      this.mostrarMsgValidaciones = false;
      this.mensajeValidacuines = '';
    }
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const url: string = 'http://localhost/Hipolita/api/Etiqueta?nro_Consultar=' + nroGuia + '&tipo=' + opcion;
    // const url: string = 'https://azwappfronthipodev.azaseusedev.avtest.online/api/Etiqueta?nro_Consultar=' + nroGuia + '&tipo=' + opcion;
    window.open(url);
    this.spinner.hide();
}
}
