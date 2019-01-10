import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfigService } from '../ReadConfig/read-config';
import { AsignarGuiaMasterService } from './asignarGuiaMaster.service';
import { Messages} from '../Library/Messages';

@Component({
  selector: 'app-guia-master',
  templateUrl: './guia-master.component.html',
  styleUrls: ['./guia-master.component.css']
})
export class GuiaMasterComponent extends Messages implements OnInit {

  private esbErrorCodes : string = this.configService.loadJSON('./assets/config.js')['ESB_ERROR_STATUS'];
  private esbCompleteWithErrorCodes : string = this.configService.loadJSON('./assets/config.js')['ESB_COMPLETE_WITH_ERROR_STATUS'];
  private closeResult: string;
  private varChecked;
  private urlService: any;
  private guias: { varCheck: boolean, client_reference: string, Shipment_number: string, guiamaster: string, guiamasterdate: string }[] = [];
  private listGuias: String[] = [];


  constructor(private modalService: NgbModal, private spinner: NgxSpinnerService, private configService: ConfigService, private guiaMasterService: AsignarGuiaMasterService) {
    super();
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
    
    console.log("Datos ingresados [Fecha Inicio: ",fechaIni," , Fecha Fin: ",fechaFin," , Nro Guia: ",nroGuia,"]");

    if (this.validarCampos(fechaIni, fechaFin, nroGuia) && this.validarFechas(fechaIni, fechaFin)) {
        this.consumirServicio(nroGuia, fechaIni, fechaFin);
      }

    if (this.guias === null) {
      target.querySelector('#txtDateIni').value = null;
      target.querySelector('#txtDateFin').value = null;
      target.querySelector('#txtNroGuia').value = null;
    }
  }

  consumirServicio(numGuia, fechaI, fechaF) {
    this.spinner.show();
    
    this.guiaMasterService.getData(fechaI, fechaF, true, [numGuia], '', '').subscribe(
      data => {
        if(data.headers.get('SCodigo') != null && this.esbErrorCodes.includes(data.headers.get('SCodigo'))){
          this.setErrorMessage(true, data.headers.get('SCodigo')  + ' - ' + data.headers.get('SMensaje'), false);
          this.spinner.hide();
          return;
        }

        if(data.headers.get('SCodigo') != null && this.esbCompleteWithErrorCodes.includes(data.headers.get('SCodigo'))){
          this.setAlertMessage(true, data.headers.get('SCodigo')  + ' - ' + data.headers.get('SMensaje'), false);
          this.spinner.hide();
          return;
        }

        this.guias = data.body;
        for (let index in this.guias) {
          this.guias[index].varCheck = false;
        }

        if (this.guias !== null) {
          this.setInfoMessage(false, null, true);
        } else {
          this.setInfoMessage(true, 'No se encontraron resultados', false);
        }
        this.spinner.hide();
      },
      error => {
        var errorMessage = error.headers.get('SCodigo') == null ? error.status + ' - ' : error.headers.get('SCodigo')  + ' - ';
        errorMessage += error.headers.get('SMensaje') == null ? error.statusText : error.headers.get('SMensaje');
        this.setErrorMessage(true, errorMessage, false);
        this.spinner.hide();
      }
    );
  }

  getSelectGuiaMaster(uss, isChecked) {
    if (isChecked) {
      this.listGuias.push(uss);
    } else {
      for (let i = 0; i < this.listGuias.length; i++) {
        if (uss === this.listGuias[i]) {
          this.listGuias.splice(i, 1);
        }
      }
    }

    this.mostrarBtnMAWB = this.listGuias.length > 0 ? true : false;
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

    if (this.validarCamposMawb(nroMawb, fechMawb)) 
      this.consumirServiciodos(nroMawb, fechMawb);
  }

  validarCamposMawb(varNroMawb, varFechMawb) {
    if (varNroMawb !== '' || varFechMawb !== '') {
      return true;
    } else {
      this.mensajeAlertaMawb = this.mensajeAlertaMawb + 'Debe diligenciar los campos "Numero de MAWB" y "Fecha de MAWB". ';
      this.mostrarMensajeMawb = true;
      return false;
    }
  }

  consumirServiciodos(varNroMawb, varFechMawb) {
    this.spinner.show();

    this.guiaMasterService.getData('', '', false, this.listGuias, varNroMawb, varFechMawb).subscribe(
      data => {
        if(data.headers.get('SCodigo') != null && this.esbErrorCodes.includes(data.headers.get('SCodigo'))){
          this.hideGuiasMasterMessage('', data.headers.get('SCodigo')  + ' - ' + data.headers.get('SMensaje'));
          this.serviceResultGuiasMaster(false, true);
          this.spinner.hide();
          return;
        }

        if(data.headers.get('SCodigo') != null && this.esbCompleteWithErrorCodes.includes(data.headers.get('SCodigo'))){
          this.hideGuiasMasterMessage(data.headers.get('SCodigo')  + ' - ' + data.headers.get('SMensaje'),'');
          this.serviceResultGuiasMaster(true, false);
          this.spinner.hide();
          return;
        }

        this.hideGuiasMasterMessage('Guia(s) Actualizada(s)','');
        this.serviceResultGuiasMaster(true, false);
      },
      error => {
        var errorMessage = error.headers.get('SCodigo') == null ? error.status + ' - ' : error.headers.get('SCodigo')  + ' - ';
        errorMessage += error.headers.get('SMensaje') == null ? error.statusText : error.headers.get('SMensaje');
        this.hideGuiasMasterMessage('', errorMessage);
        this.serviceResultGuiasMaster(false, true);
      }
    );
  }

  serviceResultGuiasMaster(showMenSuccessMawb : boolean, showMenErrorMawb : boolean){
    this.listGuias = [];
    this.mostrarMenSuccessMawb = showMenSuccessMawb;
    this.mostrarMenErrorMawb = showMenErrorMawb;
    this.modalService.dismissAll();
    this.spinner.hide();
  }

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

    } else {
      for (let obj in this.guias) {
        this.guias[obj].varCheck = false;
        this.listGuias = [];

      }
    }
    this.mostrarBtnMAWB = this.listGuias.length > 0 ? true : false;
  }

}
