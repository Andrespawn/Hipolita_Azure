import { Component, OnInit } from '@angular/core';
import { ConsultarFacturaComercialService } from './consultar-factura-comercial-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpResponse } from '@angular/common/http';


@Component({
  selector: 'app-new-component',
  templateUrl: './consultar-factura-comercial.component.html',
  styleUrls: ['./consultar-factura-comercial.component.css']
})
export class FacturasComercialesComponent implements OnInit {

  verTable: boolean = false;
  verMensajeValidacion: boolean = false;
  verMensajeError: boolean = false;
  verMensajeInfo: boolean = false;

  mensajeValidacion: string = '';
  mensajeErrorService: string = '';
  mensajeInfo: string = '';

  public listArchivos: { nameFile: string, pathFile: string, document: string }[] = [];

  constructor(private consultaService: ConsultarFacturaComercialService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
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
      const tales = this.consultaService.getData(fechaIni, fechaFin, nroGuia, nroFactura, '', '').subscribe(
        data => {
          console.log('Data****************', data);

          if (data.documents.length === 0) {

            this.verMensajeInfo = true;
            this.mensajeInfo = 'No se encontraron archivos.';
          } else {
            if (data.documents.length > 1) {

              this.verTable = true;
              for (let index in data.documents) {
                this.listArchivos.push({ nameFile: data.documents[index].nameFile, pathFile: data.documents[index].pathFile, document: '' });
              }
            } else {
              this.verTable = false;
              this.descargarArchivo(data.documents[0].pathFile, data.documents[0].nameFile)
            }
          }
          this.spinner.hide();
        },
        error => {
          console.log('Error****************', error);
          this.verMensajeError = true;
          this.mensajeErrorService = '' + error.message;
          
          this.spinner.hide();
        }
      );
      target.querySelector('#txtDateIni').value = '';
      target.querySelector('#txtDateFin').value = '';
      target.querySelector('#txtNroGuia').value = '';
      target.querySelector('#txtNroFactura').value = '';
      console.log('Tales****************',tales);
    } else {
      this.verTable = false;
    }
  }


  validarCampos(fechaIni, fechaFin, nroGuia, nroFactura) {
    var validado = false;

    if (fechaIni === '' && fechaFin === '' && nroGuia === '' && nroFactura === '') {
      validado = false;

      this.mensajeValidacion = 'Debe diligenciar algun campo';
      this.verMensajeValidacion = true;

    } else if (fechaIni === '' && fechaFin === '' && nroGuia === '' && nroFactura !== '') {
      validado = true;

      this.verMensajeValidacion = false;
      this.mensajeValidacion = '';

    } else if (fechaIni === '' && fechaFin === '' && nroGuia !== '' && nroFactura === '') {
      validado = true;

      this.verMensajeValidacion = false;
      this.mensajeValidacion = '';

    } else if (fechaIni !== '' && fechaFin === '' && nroGuia === '' && nroFactura === '') {
      validado = false;

      this.mensajeValidacion = 'Debe diligenciar fecha Fin';
      this.verMensajeValidacion = true;

    } else if (fechaIni === '' && fechaFin !== '' && nroGuia === '' && nroFactura === '') {
      validado = false;

      this.mensajeValidacion = 'Debe diligenciar fecha inicio';
      this.verMensajeValidacion = true;

    } else if (fechaIni !== '' && fechaFin !== '' && nroGuia === '' && nroFactura === '') {
      if (fechaIni > fechaFin) {
        validado = false;

        this.mensajeValidacion = 'Fecha inicio debe menor a la fecha fin ';
        this.verMensajeValidacion = true;

      } else {
        validado = true;

        this.mensajeValidacion = '';
        this.verMensajeValidacion = false;

      }
    }
    return validado;
  }

  descargarArchivo(filepath, fileName) {
    this.spinner.show();
    this.consultaService.getData('', '', '', '', filepath, fileName).subscribe(
      data => {
        const linkSource = 'data:application/pdf;base64,' + data.documents[0].document;
        const downloadLink = document.createElement("a");
        const fileName = data.documents[0].nameFile;

        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
        this.verMensajeInfo = true;
        this.mensajeInfo = 'Documento generado exitosamente';
        this.spinner.hide();
      },
      error => {
        this.verMensajeInfo = false;
        this.mensajeInfo = '';
        this.verMensajeError = true;
        this.mensajeErrorService = '' + error.message;
        this.spinner.hide();
      }
    );
  }

  generarReporte(event, item) {
    event.preventDefault();
    this.descargarArchivo(item.pathFile, item.nameFile);
  }

  inicializarVariables() {
    this.verTable = false;
    this.verMensajeValidacion = false;
    this.verMensajeError = false;
    this.verMensajeInfo = false;

    this.mensajeValidacion = '';
    this.mensajeErrorService = '';
    this.mensajeInfo = '';

    this.listArchivos = [];
  }

}
