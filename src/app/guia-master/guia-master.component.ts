import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GuiaAsignacionInterface } from './asignacion';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { strictEqual } from 'assert';

@Component({
  selector: 'app-guia-master',
  templateUrl: './guia-master.component.html',
  styleUrls: ['./guia-master.component.css']
})
export class GuiaMasterComponent implements OnInit {

  guias: { varCheck: boolean, client_reference: string, Shipment_number: string, guiamaster: string, guiamasterdate: string }[] = [];

  listGuias: String[] = [];

  mensajeAlerta: String = '';
  mensajeAlertaMawb: String = '';
  mensajeSuccessMawb: String = '';
  mensajeErrorMawb: String = '';
  mensajeErrorService: String = '';
  mensajeResponse: String = '';

  varChecked;

  mostrarMensajeResponse: Boolean = false;
  mostrarMensaje: Boolean = false;
  mostrarTbl: Boolean = false;
  mostrarBtnMAWB: Boolean = false;
  mostrarMensajeMawb: Boolean = false;
  mostrarMenSuccessMawb: Boolean = false;
  mostrarMenErrorMawb: Boolean = false;
  mostrarMenErrorService: Boolean = false;

  constructor(private httpClient: HttpClient, private modalService: NgbModal, private spinner: NgxSpinnerService) {

  }

  ngOnInit() {
  }

  buscarGuia(event) {
    event.preventDefault();

    this.mensajeAlerta = "";
    this.mensajeAlertaMawb = "";
    this.mensajeSuccessMawb = "";
    this.mensajeErrorMawb = "";
    this.mensajeErrorService = "";
    this.mostrarMensaje = false;
    this.mostrarTbl = false;
    this.mostrarBtnMAWB = false;
    this.mostrarMensajeMawb = false;
    this.mostrarMenSuccessMawb = false;
    this.mostrarMenErrorService = false;

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

    if (this.guias === null) {
      target.querySelector('#txtDateIni').value = null;
      target.querySelector('#txtDateFin').value = null;
      target.querySelector('#txtNroGuia').value = null;
    }
  }

  consumirServicio(numGuia, fechaI, fechaF) {
 
    const body: GuiaAsignacionInterface = {
      Date_start: fechaI, Date_end: fechaF, Consulta: true, Guia_Alertran: [numGuia], Nro_GuiaMaster: '', Date_GuiaMaster: ''
    };

    const json = JSON.stringify(body);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'SOrigenCliente': 'Hipolita',
      'Scanal': 'Hipolita',
      'SUsuario': 'Hipolita',
      'Ocp-Apim-Subscription-Key': '80336ece60c2410c86a8c7503170af68',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
    });
    this.spinner.show();
    console.log(json);
    // this.httpClient.post('http://172.20.6.6:8185/cxf/AsignarGuiaMaster/AsignarGuiaMaster', json, {
    this.httpClient.post<any>('https://az-am-exp-use-dev.azure-api.net/guiamaster/AsignarGuiaMaster/AsignarGuiaMaster', json, { headers }/*{
      headers: new HttpHeaders({ 'Access-Control-Allow-Origin': 'http://localhost:4200', 'Content-Type': 'application/json' })
    }*/).subscribe(
      data => {
        this.guias = data;
        for (let index in this.guias) {
          this.guias[index].varCheck = false;
        }

        if (this.guias !== null) {
          this.mostrarMensajeResponse = false;
          this.mensajeResponse = null;
          this.mostrarTbl = true;
          console.log("OK", this.guias);
        } else {
          this.mostrarMensajeResponse = true;
          this.mensajeResponse = 'No se encontraron resultados';
          this.mostrarTbl = false;
        }

        this.spinner.hide();

      },
      error => {
        console.log('error ', error);
        this.mostrarTbl = false;
        this.mostrarMenErrorService = true;
        this.mensajeErrorService = '' + error.message;
        this.spinner.hide();

      }
      );
  }

  getSelectGuiaMaster(uss, isChecked) {
    console.log(uss);
    // console.log(isChecked);
    if (isChecked) {
      this.listGuias.push(uss);
    } else {
      for (let i = 0; i < this.listGuias.length; i++) {
        if (uss === this.listGuias[i]) {
          this.listGuias.splice(i, 1);
        }
      }
    }

    if (this.listGuias.length > 0) {
      this.mostrarBtnMAWB = true;
    } else {
      this.mostrarBtnMAWB = false;
    }

    console.log("",this.mostrarBtnMAWB);
    // console.log(this.listGuias);
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
      this.mensajeAlerta = this.mensajeAlerta + 'Debe diligenciar fecha fin. ';
      this.mostrarMensaje = true;
      return false;
    } else if (fecIni == '' && fecFin != '') {
      this.mensajeAlerta = this.mensajeAlerta + 'Debe diligenciar fecha inicio. ';
      this.mostrarMensaje = true;
      return false;
    }


    if (fecIni > fecFin) {
      this.mensajeAlerta = this.mensajeAlerta + 'Fecha inicio debe ser menos a la fecha fin. ';
      this.mostrarMensaje = true;
      return false;

    } else {
      this.mostrarMensaje = false;
      return true;
    }
  }


  actualizarGuias(event) {
    event.preventDefault();
    this.mensajeAlertaMawb = '';
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
    if (varNroMawb !== '' || varFechMawb !== '') {
      console.log(varNroMawb, varFechMawb);
      return true;
    } else {
      this.mensajeAlertaMawb = this.mensajeAlertaMawb + 'Debe diligenciar los campos "Numero de MAWB" y "Fecha de MAWB". ';
      this.mostrarMensajeMawb = true;
      return false;
    }
  }

  consumirServiciodos(varNroMawb, varFechMawb) {
    var body: GuiaAsignacionInterface = {
      Date_start: '', Date_end: '', Consulta: false, Guia_Alertran: this.listGuias, Nro_GuiaMaster: varNroMawb, Date_GuiaMaster: varFechMawb
    };

    var json = JSON.stringify(body);
    console.log(json);
    console.log(this.listGuias);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'SOrigenCliente': 'Hipolita',
      'Scanal': 'Hipolita',
      'SUsuario': 'Hipolita',
      'Ocp-Apim-Subscription-Key': '80336ece60c2410c86a8c7503170af68',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
    });
    this.spinner.show();

    // this.httpClient.post('http://172.20.6.6:8185/cxf/AsignarGuiaMaster/AsignarGuiaMaster', json, {
    this.httpClient.post('https://az-am-exp-use-dev.azure-api.net/guiamaster/AsignarGuiaMaster/AsignarGuiaMaster', json, { headers }
      //  headers: new HttpHeaders({ 'Access-Control-Allow-Origin': 'https://azrav-webapp-tst28.azurewebsites.net',
      // 'Content-Type': 'application/json' })
      // headers: new HttpHeaders({'Content-Type': 'application/json' })
    ).subscribe(
      data => {
        this.mensajeAlerta = '';
        this.mensajeAlertaMawb = '';

        this.mostrarMensaje = false;
        this.mostrarTbl = false;
        this.mostrarBtnMAWB = false;
        this.mostrarMensajeMawb = false;
        this.listGuias = [];
        // this.guias = null;
        this.mensajeSuccessMawb = 'Guia(s) Actualizada(s)';
        this.mostrarMenSuccessMawb = true;
        this.mostrarBtnMAWB = false;
        this.mostrarMenErrorMawb = false;
        this.modalService.dismissAll();
        this.spinner.hide();
      },
      error => {
        this.mensajeAlerta = '';
        this.mensajeAlertaMawb = '';

        this.mostrarMensaje = false;
        this.mostrarTbl = false;
        this.mostrarBtnMAWB = false;
        this.mostrarMensajeMawb = false;

        this.listGuias = [];
        this.mensajeSuccessMawb = '';
        this.mostrarMenSuccessMawb = false;
        this.mostrarBtnMAWB = false;
        console.log('error ', error);
        this.mensajeErrorMawb = error.message;
        this.mostrarMenErrorMawb = true;

        this.modalService.dismissAll();
        this.spinner.hide();
      }
    );

  }

  /************/



  closeResult: string;

  open(content) {
    this.mensajeAlertaMawb = '';
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


  checkedAll(isChecked) {

    if (isChecked) {
      for (let obj in this.guias) {
        this.guias[obj].varCheck = true;
        this.listGuias.push(this.guias[obj].Shipment_number);
      }
      //console.log(this.listGuias);

    }else{
      for (let obj in this.guias) {
        this.guias[obj].varCheck = false;
        this.listGuias = [];
        
      }
      //console.log(this.listGuias);
    }


    if (this.listGuias.length > 0) {
      this.mostrarBtnMAWB = true;
    } else {
      this.mostrarBtnMAWB = false;
    }
  }

}


