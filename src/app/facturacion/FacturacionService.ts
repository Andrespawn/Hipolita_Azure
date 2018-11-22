import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SPath } from '../Services/sPath';

import { ConfigService } from '../ReadConfig/read-config';


@Injectable({
  providedIn: 'root'
})
export class FacturacionService {

  urlFacturacionFleteService: any;
  urlFacturacionImpuestoService: any;

  constructor(private httpClient: HttpClient, private configService: ConfigService) {
    
  }
  
  getData(DateStart, DateEnd, tipo) {

    this.urlFacturacionFleteService = this.configService.loadJSON('./assets/config.js')['URL_FACTURACION_FLETE_SERVICE'];
    this.urlFacturacionImpuestoService = this.configService.loadJSON('./assets/config.js')['URL_FACTURACION_IMPUESTO_SERVICE'];

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
    const body: String = '{"request":  { "Date_start":"' +
      DateStart + '","Date_end":"' +
      DateEnd + '"}}';

    //Transform to JSON
    const json = JSON.stringify(body);

    //Send POST
    if (tipo === 'Facturacion Flete') {
      return this.httpClient.post<SPath>(this.urlFacturacionFleteService, body, { headers });
    } else {
      return this.httpClient.post<SPath>(this.urlFacturacionImpuestoService, body, { headers });
    }
  }
}
