import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ConfigService } from '../ReadConfig/read-config';

import { ConsultaFacturaCoInterface } from './consultar-factura-comercial-interface';


@Injectable({
  providedIn: 'root'
})
export class ConsultarFacturaComercialService {

  urlService: any;

  constructor(private httpClient: HttpClient, private configService: ConfigService) {
  }

  getData(fechaI, fechaF, nroGuia, nroFactura, filePath, fileName) {
    /*FALTA */
    //Set URL Service
    this.urlService = this.configService.loadJSON('./assets/config.js')['URL_FACTURA_COMERCIAL_SERVICE'];
    console.log('*****REQUEST URL*****: ', this.urlService);

    //Set headers
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'/*,
      'SOrigenCliente': 'Hipolita',
      'Scanal': 'Hipolita',
      'SUsuario': 'Hipolita',
      'Ocp-Apim-Subscription-Key': '80336ece60c2410c86a8c7503170af68',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'*/
    });
    console.log('*****REQUEST HEADERS*****: ', headers);

    //Build Body
    const body: ConsultaFacturaCoInterface = {
      date_start: fechaI, date_end: fechaF, trackingid: nroFactura, mawb: nroGuia, pathFile: filePath, nameFile: fileName
    };
    console.log('*****REQUEST BODY*****: ', body);

    //Transform to JSON
    const json = JSON.stringify(body);
    console.log('*****REQUEST JSON*****: ', json);

    //Send POST
    return this.httpClient.post<any>(this.urlService, json, { headers , observe: 'response'});
  }
}
