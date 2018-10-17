import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GuiaAsignacionInterface } from './asignacion';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-guia-master',
  templateUrl: './guia-master.component.html',
  styleUrls: ['./guia-master.component.css']
})
export class GuiaMasterComponent implements OnInit {

  guias: Object = [];
  listGuias: String[] = [];

  mensajeAlerta: String = '';
  mensajeAlertaMawb: String = '';
  mensajeSuccessMawb: String = '';
  mensajeErrorMawb: String = '';

  mostrarMensaje: Boolean = false;
  mostrarTbl: Boolean = false;
  mostrarBtnMAWB: Boolean = false;
  mostrarMensajeMawb: Boolean = false;
  mostrarMenSuccessMawb: Boolean = false;
  mostrarMenErrorMawb: Boolean = false;

  constructor(private httpClient: HttpClient, private modalService: NgbModal) {

  }

  ngOnInit() {
  }

  buscarGuia(event) {
    event.preventDefault();

    this.mensajeAlerta = "";
    this.mensajeAlertaMawb = "";
    this.mensajeSuccessMawb = "";
    this.mensajeErrorMawb = "";
    this.mostrarMensaje = false;
    this.mostrarTbl = false;
    this.mostrarBtnMAWB = false;
    this.mostrarMensajeMawb = false;
    this.mostrarMenSuccessMawb = false;

    const target = event.target;
    const fechaIni: Date = target.querySelector('#txtDateIni').value;
    const fechaFin: Date = target.querySelector('#txtDateFin').value;
    const nroGuia = target.querySelector('#txtNroGuia').value;
    const validacionCampos = this.validarCampos(fechaIni, fechaFin, nroGuia);

    if (validacionCampos) {

      const fechasValidas = this.validarFechas(fechaIni, fechaFin);

      if (fechasValidas) {

        this.consumirServicio(nroGuia, fechaIni, fechaFin);

      }
    }
  }

  consumirServicio(numGuia, fechaI, fechaF) {

    var body: GuiaAsignacionInterface = {
      Date_start: fechaI, Date_end: fechaF, Consulta: true, Guia_Alertran: [numGuia], Nro_GuiaMaster: "", Date_GuiaMaster: ""
    };

    var json = JSON.stringify(body);
    this.httpClient.post('http://172.20.6.6:8185/cxf/AsignarGuiaMaster/AsignarGuiaMaster', json, {
      // this.httpClient.post('https://avapimgmtexpqa.azure-api.net/GuiaMaster/AsignarGuiaMaster/AsignarGuiaMaster', json, {
      headers: new HttpHeaders({ 'Access-Control-Allow-Origin': 'http://localhost:4200', 'Content-Type': 'application/json' })
    }).subscribe(
      data => {
        this.guias = data;
        this.mostrarTbl = true;

      },
      error => {
        console.log('error ', error);
        this.mostrarTbl = false;
        this.mostrarMensaje = true;
        this.mensajeAlerta = '' + error.message;
      }
    );
  }

  getSelectGuiaMaster(uss, isChecked) {
    console.log(uss);
    console.log(isChecked);
    if (isChecked) {
      this.listGuias.push(uss);
    } else {
      for (let i = 0; i < this.listGuias.length; i++) {
        if (uss == this.listGuias[i]) {
          this.listGuias.splice(i, 1);
        }
      }
    }

    if (this.listGuias.length > 0) {
      this.mostrarBtnMAWB = true;
    } else {
      this.mostrarBtnMAWB = false;
    }

    console.log(this.listGuias);
  }

  validarCampos(fecIni, fecFin, nroG) {
    if (fecIni === '' && fecFin === '' && nroG === '') {
      this.mensajeAlerta = 'Debe diligenciar el numero de guia o las fechas a consultar. ';
      this.mostrarMensaje = true;
      return false;
    } else {
      this.mostrarMensaje = false;
      return true;
    }
  }

  validarFechas(fecIni, fecFin) {

    if (fecIni !== '' && fecFin === '') {
      this.mensajeAlerta = this.mensajeAlerta + "Debe diligenciar fecha fin. ";
      this.mostrarMensaje = true;
      return false;
    } else if (fecIni == "" && fecFin != "") {
      this.mensajeAlerta = this.mensajeAlerta + "Debe diligenciar fecha inicio. ";
      this.mostrarMensaje = true;
      return false;
    }


    if (fecIni > fecFin) {
      this.mensajeAlerta = this.mensajeAlerta + "Fecha inicio debe ser menos a la fecha fin. ";
      this.mostrarMensaje = true;
      return false;

    } else {
      this.mostrarMensaje = false;
      return true;
    }
  }


  actualizarGuias(event) {
    event.preventDefault();
    this.mensajeAlertaMawb = "";
    this.mostrarMensajeMawb = false;

    const target = event.target;
    const nroMawb = target.querySelector('#txtNroMawb').value;
    const fechMawb: Date = target.querySelector('#txtFechMawb').value;
    
    const validacionCampos = this.validarCamposMawb(nroMawb, fechMawb);

    

    if (validacionCampos) {
      this.consumirServiciodos(nroMawb, fechMawb);
    } else {

    }
  }

  validarCamposMawb(varNroMawb, varFechMawb) {
    if (varNroMawb != "" || varFechMawb != "") {
      console.log(varNroMawb, varFechMawb);
      return true;
    } else {
      this.mensajeAlertaMawb = this.mensajeAlertaMawb + "Debe diligenciar los campos 'Nro de MAWB' y 'Fecha de MAWB'. ";
      this.mostrarMensajeMawb = true;
      return false;
    }
  }

  consumirServiciodos(varNroMawb, varFechMawb) {
    var body: GuiaAsignacionInterface = {
      Date_start: "", Date_end: "", Consulta: false, Guia_Alertran: this.listGuias, Nro_GuiaMaster: varNroMawb, Date_GuiaMaster: varFechMawb
    };

    var json = JSON.stringify(body);

    this.httpClient.post('http://172.20.6.6:8185/cxf/AsignarGuiaMaster/AsignarGuiaMaster', json, {
      //  this.httpClient.post('https://avapimgmtexpqa.azure-api.net/GuiaMaster/AsignarGuiaMaster/AsignarGuiaMaster', json, {
      //  headers: new HttpHeaders({ 'Access-Control-Allow-Origin': 'https://azrav-webapp-tst28.azurewebsites.net', 'Content-Type': 'application/json' })
      //headers: new HttpHeaders({ 'Access-Control-Allow-Origin': 'http://localhost:4200', 'Content-Type': 'application/json' })
    }).subscribe(
      data => {
        this.mensajeAlerta = "";
        this.mensajeAlertaMawb = "";

        this.mostrarMensaje = false;;
        this.mostrarTbl = false;
        this.mostrarBtnMAWB = false;
        this.mostrarMensajeMawb = false;

        this.guias = null;
        this.mensajeSuccessMawb = "Guia(s) Actualizada(s)";
        this.mostrarMenSuccessMawb = true;
        this.mostrarBtnMAWB = false;
        this.mostrarMenErrorMawb = false;

        this.modalService.dismissAll();
      },
      error => {
        this.mensajeAlerta = "";
        this.mensajeAlertaMawb = "";

        this.mostrarMensaje = false;;
        this.mostrarTbl = false;
        this.mostrarBtnMAWB = false;
        this.mostrarMensajeMawb = false;

        this.guias = null;
        this.mensajeSuccessMawb = "";
        this.mostrarMenSuccessMawb = false;
        this.mostrarBtnMAWB = false;


        console.log("error ", error);
        this.mensajeErrorMawb = error.message;
        this.mostrarMenErrorMawb = true;

        this.modalService.dismissAll();
      }
    );

  }

  /************/



  closeResult: string;

  open(content) {
    this.mensajeAlertaMawb = "";
    this.mostrarMensajeMawb = false;
    event.preventDefault();
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
