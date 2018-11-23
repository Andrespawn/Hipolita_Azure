import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from '../ReadConfig/read-config';
import { GuiaAsignacionInterface } from './asignacion';

@Injectable({
  providedIn: 'root'
})
export class AsignarGuiaMasterService {

  urlService: any;

  constructor(private httpClient: HttpClient, private configService: ConfigService) {
  }

  getData(fechaI, fechaF, consulta, guiaAlertran, nroGuia, dateGuia) {

    //Set URL Service
    this.urlService = this.configService.loadJSON('./assets/config.js')['URL_GUIA_MASTER'];
    
    //Set headers
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'SOrigenCliente': 'Hipolita',
      'Scanal': 'Hipolita',
      'SUsuario': 'Hipolita',
      'Ocp-Apim-Subscription-Key': '80336ece60c2410c86a8c7503170af68',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
    });


    //Build Body
    const body: GuiaAsignacionInterface = {
      Date_start: fechaI, Date_end: fechaF, Consulta: consulta, Guia_Alertran: guiaAlertran, Nro_GuiaMaster: nroGuia, Date_GuiaMaster: dateGuia
    };

    //Transform to JSON
    const json = JSON.stringify(body);
    
    //Send POST
    return this.httpClient.post<any>(this.urlService, json, { headers });


  }



}
