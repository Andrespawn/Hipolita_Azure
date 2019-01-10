import { Component} from '@angular/core';
import { ConsultarFacturaComercialService } from './consultar-factura-comercial-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfigService } from '../ReadConfig/read-config';
import { Messages} from '../Library/Messages';

@Component({
  selector: 'app-new-component',
  templateUrl: './consultar-factura-comercial.component.html',
  styleUrls: ['./consultar-factura-comercial.component.css']
})
export class FacturasComercialesComponent extends Messages {

  public listArchivos: { nameFile: string, pathFile: string, document: string }[] = [];
  private esbErrorCodes : string = this.configService.loadJSON('./assets/config.js')['ESB_ERROR_STATUS'];
  private esbCompleteWithErrorCodes : string = this.configService.loadJSON('./assets/config.js')['ESB_COMPLETE_WITH_ERROR_STATUS'];

  constructor(private consultaService: ConsultarFacturaComercialService, private configService: ConfigService, private spinner: NgxSpinnerService) {
    super();
   }

  consultar(event) {
    event.preventDefault();
    this.inicializarVariables();
    this.listArchivos = [];

    const target = event.target;

    const fechaIni: string = target.querySelector('#txtDateIni').value;
    const fechaFin: string = target.querySelector('#txtDateFin').value;
    const nroGuia = target.querySelector('#txtNroGuia').value;
    const nroFactura = target.querySelector('#txtNroFactura').value;

    const validacionCampos = this.validarCampos(fechaIni, fechaFin, nroGuia, nroFactura);
    if (validacionCampos) {
      this.spinner.show();
      const service = this.consultaService.getData(fechaIni, fechaFin, nroGuia, nroFactura, '', '').subscribe(
        data => {
          if(data.headers.get('SCodigo') != null && this.esbErrorCodes.includes(data.headers.get('SCodigo'))){
            this.mostrarMensajeResponse = true;
            this.mensajeResponse = data.headers.get('SCodigo')  + ' - ' + data.headers.get('SMensaje');
            this.spinner.hide();
            return;
          }
  
          if(data.headers.get('SCodigo') != null && this.esbCompleteWithErrorCodes.includes(data.headers.get('SCodigo'))){
            this.mostrarMensajeResponse = true;
            this.mensajeResponse = data.headers.get('SCodigo')  + ' - ' + data.headers.get('SMensaje');
            this.spinner.hide();
            return;
          }
  
          console.log('Data****************', data);
          if (data.body.documents.length === 0) {

            this.mostrarMensajeResponse = true;
            this.mensajeResponse = 'No se encontraron archivos.';
          } else {
            if (data.body.documents.length > 1) {

              this.mostrarTbl = true;
              for (let index in data.body.documents) {
                this.listArchivos.push({ nameFile: data.body.documents[index].nameFile, pathFile: data.body.documents[index].pathFile, document: '' });
              }
            } else {
              this.mostrarTbl = false;
              this.descargarArchivo(data.body.documents[0].pathFile, data.body.documents[0].nameFile)
            }
          }
          this.spinner.hide();
        },
        error => {
          console.log('Error****************', error);
          var errorMessage = error.headers.get('SCodigo') == null ? error.status + ' - ' : error.headers.get('SCodigo')  + ' - ';
          errorMessage += error.headers.get('SMensaje') == null ? error.statusText : error.headers.get('SMensaje');
          this.mostrarMenErrorService = true;
          this.mensajeErrorService = errorMessage;
          
          this.spinner.hide();
        }
      );
      target.querySelector('#txtDateIni').value = '';
      target.querySelector('#txtDateFin').value = '';
      target.querySelector('#txtNroGuia').value = '';
      target.querySelector('#txtNroFactura').value = '';
      console.log('Service****************',service);
    } else {
      this.mostrarTbl = false;
    }
  }


  validarCampos(fechaIni, fechaFin, nroGuia, nroFactura) {
    var validado = false;

    if (fechaIni === '' && fechaFin === '' && nroGuia === '' && nroFactura === '') {
      validado = false;

      this.mensajeAlerta = 'Debe diligenciar algun campo';
      this.mostrarMensaje = true;

    } else if (fechaIni === '' && fechaFin === '' && nroGuia === '' && nroFactura !== '') {
      validado = true;

      this.mostrarMensaje = false;
      this.mensajeAlerta = '';

    } else if (fechaIni === '' && fechaFin === '' && nroGuia !== '' && nroFactura === '') {
      validado = true;

      this.mostrarMensaje = false;
      this.mensajeAlerta = '';

    } else if (fechaIni !== '' && fechaFin === '' && nroGuia === '' && nroFactura === '') {
      validado = false;

      this.mensajeAlerta = 'Debe diligenciar fecha Fin';
      this.mostrarMensaje = true;

    } else if (fechaIni === '' && fechaFin !== '' && nroGuia === '' && nroFactura === '') {
      validado = false;

      this.mensajeAlerta = 'Debe diligenciar fecha inicio';
      this.mostrarMensaje = true;

    } else if (fechaIni !== '' && fechaFin !== '' && nroGuia === '' && nroFactura === '') {
      if (fechaIni > fechaFin) {
        validado = false;

        this.mensajeAlerta = 'Fecha inicio debe menor a la fecha fin ';
        this.mostrarMensaje = true;

      } else {
        validado = true;

        this.mensajeAlerta = '';
        this.mostrarMensaje = false;

      }
    }
    return validado;
  }

  descargarArchivo(filepath, fileName) {
    this.spinner.show();
    this.consultaService.getData('', '', '', '', filepath, fileName).subscribe(
      data => {
        if(data.headers.get('SCodigo') != null && this.esbErrorCodes.includes(data.headers.get('SCodigo'))){
          this.mostrarMensajeResponse = true;
          this.mensajeResponse =data.headers.get('SCodigo')  + ' - ' + data.headers.get('SMensaje');
          this.spinner.hide();
          return;
        }

        if(data.headers.get('SCodigo') != null && this.esbCompleteWithErrorCodes.includes(data.headers.get('SCodigo'))){
          this.mostrarMensajeResponse = true;
          this.mensajeResponse =data.headers.get('SCodigo')  + ' - ' + data.headers.get('SMensaje');
          this.spinner.hide();
          return;
        }
        const linkSource = 'data:application/pdf;base64,' + data.body.documents[0].document;
        const downloadLink = document.createElement("a");
        const fileName = data.body.documents[0].nameFile;

        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
        this.mostrarMensajeResponse = true;
        this.mensajeResponse = 'Documento generado exitosamente';
        this.spinner.hide();
      },
      error => {
        var errorMessage = error.headers.get('SCodigo') == null ? error.status + ' - ' : error.headers.get('SCodigo')  + ' - ';
        errorMessage += error.headers.get('SMensaje') == null ? error.statusText : error.headers.get('SMensaje');
        this.mostrarMensajeResponse = false;
        this.mensajeResponse = '';
        this.mostrarMenErrorService = true;
        this.mensajeErrorService = errorMessage;
        this.spinner.hide();
      }
    );
  }

  generarReporte(event, item) {
    event.preventDefault();
    this.descargarArchivo(item.pathFile, item.nameFile);
  }

  inicializarVariables() {
    this.mostrarTbl = false;
    this.mostrarMensaje = false;
    this.mostrarMenErrorService = false;
    this.mostrarMensajeResponse = false;

    this.mensajeAlerta = '';
    this.mensajeErrorService = '';
    this.mensajeResponse = '';

    this.listArchivos = [];
  }

}
