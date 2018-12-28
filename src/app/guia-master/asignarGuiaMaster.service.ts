import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from '../ReadConfig/read-config';
import { GuiaAsignacionInterface } from './asignacion';

@Injectable({
  providedIn: 'root'
})
export class AsignarGuiaMasterService {

  urlService: any;
  private apimSubscriptionKey = this.configService.loadJSON('./assets/config.js')['APIM_SUBSCRIPTION_KEY'];

  constructor(private httpClient: HttpClient, private configService: ConfigService) {
  }

  getData(fechaI, fechaF, consulta, guiaAlertran, nroGuia, dateGuia) {

    //Set URL Service
    this.urlService = this.configService.loadJSON('./assets/config.js')['URL_GUIA_MASTER'];
    console.log('*****REQUEST URL*****: ',this.urlService);

    //Set headers
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'SOrigenCliente': 'Hipolita',
      'Scanal': 'Hipolita',
      'SUsuario': 'Hipolita',
      'Ocp-Apim-Subscription-Key': this.apimSubscriptionKey,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
    });
    console.log('*****REQUEST HEADERS*****: ',headers);

    //Build Body
    const body: GuiaAsignacionInterface = {
      Date_start: fechaI, Date_end: fechaF, Consulta: consulta, Guia_Alertran: guiaAlertran, Nro_GuiaMaster: nroGuia, Date_GuiaMaster: dateGuia
    };
    console.log('*****REQUEST BODY*****: ',body);

    //Transform to JSON
    const json = JSON.stringify(body);
    console.log('*****REQUEST JSON*****: ',json);

    //Send POST
    return this.httpClient.post<any>(this.urlService, json, { headers });


  }



}
