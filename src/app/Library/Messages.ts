export class Messages {

    protected mensajeAlerta: String;
    protected mensajeAlertaMawb: String;
    protected mensajeSuccessMawb: String;
    protected mensajeErrorMawb: String;
    protected mensajeErrorService: String;
    protected mensajeResponse: String;
    protected mostrarMensajeResponse: Boolean;
    protected mostrarMensaje: Boolean;
    protected mostrarTbl: Boolean;
    protected mostrarBtnMAWB: Boolean;
    protected mostrarMensajeMawb: Boolean;
    protected mostrarMenSuccessMawb: Boolean;
    protected mostrarMenErrorMawb: Boolean;
    protected mostrarMenErrorService: Boolean;
    protected mostrarMensajeValidacionForm: Boolean;
    protected mostrarMensajeFileVoid: Boolean;
    protected mensajeAlertaValidacionForm: String;
    protected mensajeAlertaErrorService: String;
    protected mensajeAlertaFileVoid: String;
    protected mostrarMensajeErrorService: Boolean;
    protected mostrarMensajeValidacion: Boolean;
    protected mensajeValidacion: String;
    protected mostrarMsgValidaciones: Boolean;
    protected mostrarMsgDescarga: Boolean;
    protected mostrarMsgError: Boolean;
    protected mensajeValidacuines: String;
    protected mensajeDescarga: String;
    protected mensajeError: String;
    protected msjValidacion: String;
    protected msjErrorService: String;
    protected mostarMsjValidacion: Boolean;
    protected mostarMsjErrorService: Boolean;

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

    protected setInfoMessage(showMessage : boolean, responseMessage : string, showTable : boolean){
        this.mostrarMensajeResponse = showMessage;
        this.mensajeResponse = responseMessage;
        this.mostrarTbl = showTable;
    }
    
    protected setAlertMessage(showMessage : boolean, responseMessage : string, showTable : boolean){
        this.mostrarTbl = showTable;
        this.mensajeAlerta = responseMessage;
        this.mostrarMensaje = showMessage;
    }
    
    protected setErrorMessage(showMessage : boolean, responseMessage : string, showTable : boolean){
        this.mostrarTbl = showTable;
        this.mostrarMenErrorService = showMessage;
        this.mensajeErrorService = responseMessage;
    }

    protected hideGuiasMasterMessage(message : string, errorMessageMawb : string){
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

    protected showErrorMessageSearchDocumentPath(showErrorMessage : boolean, errorMessage : string, showFileMessage : boolean, fileMessage : string){
        this.mostrarMensajeErrorService = showErrorMessage;
        this.mensajeAlertaErrorService = errorMessage;
        this.mostrarMensajeFileVoid = showFileMessage;
        this.mensajeAlertaFileVoid = fileMessage;
    }
    
}
