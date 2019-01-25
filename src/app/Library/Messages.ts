export class Messages {

    mensajeAlerta: String;
    mensajeAlertaMawb: String;
    mensajeSuccessMawb: String;
    mensajeErrorMawb: String;
    mensajeErrorService: String;
    mensajeResponse: String;
    mostrarMensajeResponse: Boolean;
    mostrarMensaje: Boolean;
    mostrarTbl: Boolean;
    mostrarBtnMAWB: Boolean;
    mostrarMensajeMawb: Boolean;
    mostrarMenSuccessMawb: Boolean;
    mostrarMenErrorMawb: Boolean;
    mostrarMenErrorService: Boolean;
    mostrarMensajeValidacionForm: Boolean;
    mostrarMensajeFileVoid: Boolean;
    mensajeAlertaValidacionForm: String;
    mensajeAlertaErrorService: String;
    mensajeAlertaFileVoid: String;
    mostrarMensajeErrorService: Boolean;
    mostrarMensajeValidacion: Boolean;
    mensajeValidacion: String;
    mostrarMsgValidaciones: Boolean;
    mostrarMsgDescarga: Boolean;
    mostrarMsgError: Boolean;
    mensajeValidacuines: String;
    mensajeDescarga: String;
    mensajeError: String;
    msjValidacion: String;
    msjErrorService: String;
    mostarMsjValidacion: Boolean;
    mostarMsjErrorService: Boolean;
    verMensajeValidacion: boolean;
    verMensajeError: boolean;
    verMensajeInfo: boolean;
    verTable: boolean;

    constructor(){
        this.mensajeAlerta = '';
        this.mensajeAlertaMawb = '';
        this.mensajeSuccessMawb = '';
        this.mensajeErrorMawb = '';
        this.mensajeErrorService = '';
        this.mensajeResponse = '';
        this.mostrarMensajeResponse = false;
        this.mostrarMensaje = false;
        this.mostrarTbl = false;
        this.mostrarBtnMAWB = false;
        this.mostrarMensajeMawb = false;
        this.mostrarMenSuccessMawb = false;
        this.mostrarMenErrorMawb = false;
        this.mostrarMenErrorService = false;
        this.mostrarMensajeValidacionForm = false;
        this.mostrarMensajeErrorService = false;
        this.mostrarMensajeFileVoid = false;
        this.mensajeAlertaValidacionForm = '';
        this.mensajeAlertaErrorService = '';
        this.mensajeAlertaFileVoid = '';
        this.mostrarMensajeValidacion = false;
        this.mensajeValidacion = '';
        this.mostrarMsgValidaciones = false;
        this.mostrarMsgDescarga = false;
        this.mostrarMsgError = false;
        this.mensajeValidacuines = '';
        this.mensajeDescarga = '';
        this.mensajeError = '';
        this.msjValidacion = '';
        this.msjErrorService = '';
        this.mostarMsjValidacion = false;
        this.mostarMsjErrorService = false;
    }

    setInfoMessage(showMessage : boolean, responseMessage : string, showTable : boolean){
        this.mostrarMensajeResponse = showMessage;
        this.mensajeResponse = responseMessage;
        this.mostrarTbl = showTable;
    }
    
    setAlertMessage(showMessage : boolean, responseMessage : string, showTable : boolean){
        this.mostrarTbl = showTable;
        this.mensajeAlerta = responseMessage;
        this.mostrarMensaje = showMessage;
    }
    
    setErrorMessage(showMessage : boolean, responseMessage : string, showTable : boolean){
        this.mostrarTbl = showTable;
        this.mostrarMenErrorService = showMessage;
        this.mensajeErrorService = responseMessage;
    }

    hideGuiasMasterMessage(message : string, errorMessageMawb : string){
        this.mensajeAlerta = '';
        this.mensajeAlertaMawb = '';
        this.mostrarMensaje = false;
        this.mostrarTbl = false;
        this.mostrarBtnMAWB = false;
        this.mostrarMensajeMawb = false;
        this.mensajeSuccessMawb = message;
        this.mostrarBtnMAWB = false;
        this.mensajeErrorMawb = errorMessageMawb;
    }

    showErrorMessageSearchDocumentPath(showErrorMessage : boolean, errorMessage : string, showFileMessage : boolean, fileMessage : string){
        this.mostrarMensajeErrorService = showErrorMessage;
        this.mensajeAlertaErrorService = errorMessage;
        this.mostrarMensajeFileVoid = showFileMessage;
        this.mensajeAlertaFileVoid = fileMessage;
    }
    
}
