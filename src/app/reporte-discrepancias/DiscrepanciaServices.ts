import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SPathDiscrepacias } from '../Services/SPathDiscrepacias';

import { ConfigService } from '../ReadConfig/read-config';

@Injectable({
  providedIn: 'root'
})
export class DiscrepanciaServices {

  urlService: any;
  private apimSubscriptionKey = this.configService.loadJSON('./assets/config.js')['APIM_SUBSCRIPTION_KEY'];

  constructor(private httpClient: HttpClient, private configService: ConfigService) {
    
  }

  getData(fechaInicio, fechaFin) {

    this.urlService = this.configService.loadJSON('./assets/config.js')['URL_REPO_DISCREPANCIAS_SERVICE'];
    console.log('*****REQUEST URL***** ',this.urlService);

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
    console.log('*****REQUEST HEADERS***** ',headers);

    //Build body
    const body: String = '{"Query": {"Date_start":"' +
      fechaInicio + '", "Date_end" : "' + fechaFin + '"}}';
      console.log('*****REQUEST BODY ***** ',body);

    //Send POST
    return this.httpClient.post<SPathDiscrepacias>(this.urlService,
      body, { headers , observe: 'response'});

  }
}
